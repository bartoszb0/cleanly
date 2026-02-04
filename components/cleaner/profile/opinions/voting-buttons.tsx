import { useCustomerContext } from "@/components/providers/customer-provider";
import { Button } from "@/components/ui/button";
import { opinionVote } from "@/lib/actions/opinions";
import { Opinion, OpinionVoteType } from "@/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

// Ok, so I came up with this stupid idea to just use useState instead
// of useOptimistic, the problem is somwehere here when using useTransition and useOptimistic,
// I should really try to do this the proper way, for now this is the best, shortest working
// solution to useOptimistic being stupid.

export default function CleanerOpinionVotingButtons({
  opinion,
}: {
  opinion: Opinion;
}) {
  const customer = useCustomerContext();

  const [opinionLikes, setOpinionLikes] = useState(opinion.likes_count);
  const [opinionDislikes, setOpinionDislikes] = useState(
    opinion.dislikes_count,
  );
  const [opinionUserVote, setOpinionUserVote] = useState(opinion.userVote);

  const isOwner = customer.id === opinion.customer_id;

  const [isPending, startTransition] = useTransition();

  const handleVote = async (type: OpinionVoteType) => {
    const nextVote = opinionUserVote === type ? null : type;

    // Remove old vote
    if (opinionUserVote === "like") {
      setOpinionLikes((prev) => prev - 1);
    }
    if (opinionUserVote === "dislike") {
      setOpinionDislikes((prev) => prev - 1);
    }

    // Add new vote
    if (nextVote === "like") {
      setOpinionLikes((prev) => prev + 1);
    }
    if (nextVote === "dislike") {
      setOpinionDislikes((prev) => prev + 1);
    }
    setOpinionUserVote(nextVote);

    startTransition(async () => {
      const result = await opinionVote(opinion.id, type);

      if (result.error) {
        toast.error(result.error);
      }
    });
  };
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleVote("like")}
        disabled={isOwner || isPending}
        className={opinionUserVote === "like" ? "bg-sky-900" : ""}
      >
        <ThumbsUp /> {opinionLikes}
      </Button>
      <Button
        onClick={() => handleVote("dislike")}
        disabled={isOwner || isPending}
        className={opinionUserVote === "dislike" ? "bg-sky-900" : ""}
      >
        <ThumbsDown /> {opinionDislikes}
      </Button>
    </div>
  );
}
