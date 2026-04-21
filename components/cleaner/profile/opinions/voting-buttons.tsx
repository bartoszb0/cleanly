import { Button } from "@/components/ui/button";
import { opinionVote } from "@/lib/actions/opinions";
import { useCustomerContext } from "@/lib/providers/customer-provider";
import { Opinion, OpinionVoteType } from "@/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

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
    const snapshot = { vote: opinionUserVote, likes: opinionLikes, dislikes: opinionDislikes };

    if (opinionUserVote === "like") setOpinionLikes((prev) => prev - 1);
    if (opinionUserVote === "dislike") setOpinionDislikes((prev) => prev - 1);
    if (nextVote === "like") setOpinionLikes((prev) => prev + 1);
    if (nextVote === "dislike") setOpinionDislikes((prev) => prev + 1);
    setOpinionUserVote(nextVote);

    startTransition(async () => {
      const result = await opinionVote(opinion.id, type);

      if (result.error) {
        toast.error(result.error);
        setOpinionUserVote(snapshot.vote);
        setOpinionLikes(snapshot.likes);
        setOpinionDislikes(snapshot.dislikes);
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
