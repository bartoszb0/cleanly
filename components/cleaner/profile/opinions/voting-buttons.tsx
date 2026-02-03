import { Button } from "@/components/ui/button";
import { Opinion } from "@/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function CleanerOpinionVotingButtons({
  opinion,
}: {
  opinion: Opinion;
}) {
  console.log(opinion);

  const vote = (type: "upvote" | "downvote") => {
    console.log(type);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => vote("upvote")}
        className={opinion.userVote === "like" ? "bg-sky-900" : ""}
      >
        <ThumbsUp /> {opinion.likes_count}
      </Button>
      <Button
        onClick={() => vote("downvote")}
        className={opinion.userVote === "dislike" ? "bg-sky-900" : ""}
      >
        <ThumbsDown /> {opinion.dislikes_count}
      </Button>
    </div>
  );
}
