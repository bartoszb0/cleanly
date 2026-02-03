import { useCustomerContext } from "@/components/providers/customer-provider";
import { Button } from "@/components/ui/button";
import { Opinion } from "@/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function CleanerOpinionVotingButtons({
  opinion,
}: {
  opinion: Opinion;
}) {
  const customer = useCustomerContext();

  const isOwner = customer.id === opinion.customer_id;

  const handleVote = (type: "like" | "dislike") => {
    console.log("Voting:", type);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleVote("like")}
        disabled={isOwner}
        className={opinion.userVote === "like" ? "bg-sky-900" : ""}
      >
        <ThumbsUp /> {opinion.likes_count}
      </Button>
      <Button
        onClick={() => handleVote("dislike")}
        disabled={isOwner}
        className={opinion.userVote === "dislike" ? "bg-sky-900" : ""}
      >
        <ThumbsDown /> {opinion.dislikes_count}
      </Button>
    </div>
  );
}
