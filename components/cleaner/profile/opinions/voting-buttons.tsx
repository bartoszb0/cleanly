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

  if (isOwner) {
    return (
      <div className="flex items-center">
        <span className="text-sm italic text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
          Your opinion
        </span>
      </div>
    );
  }

  const handleVote = (type: "like" | "dislike") => {
    console.log("Voting:", type);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleVote("like")}
        className={opinion.userVote === "like" ? "bg-sky-900" : ""}
      >
        <ThumbsUp /> {opinion.likes_count}
      </Button>
      <Button
        onClick={() => handleVote("dislike")}
        className={opinion.userVote === "dislike" ? "bg-sky-900" : ""}
      >
        <ThumbsDown /> {opinion.dislikes_count}
      </Button>
    </div>
  );
}
