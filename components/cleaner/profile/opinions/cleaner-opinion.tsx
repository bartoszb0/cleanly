import { formatDate } from "@/lib/utils";
import { Opinion } from "@/types";
import { StarIcon } from "lucide-react";
import CleanerOpinionVotingButtons from "./voting-buttons";

export default function CleanerOpinion({ opinion }: { opinion: Opinion }) {
  return (
    <div className="my-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 transition-all duration-300">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => {
          const isActive = i < opinion.rating;

          return (
            <StarIcon
              key={i}
              size={24}
              className={`${
                isActive
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-slate-700 fill-none"
              } transition-colors duration-200`}
            />
          );
        })}
      </div>

      <h3 className="mt-2 text-slate-400">{opinion.customers.full_name}</h3>

      <p className="mt-4">{opinion.content}</p>
      <div className="flex justify-between items-center mt-5">
        <CleanerOpinionVotingButtons opinion={opinion} />
        <div>
          <p>{formatDate(opinion.created_at, "full")}</p>
        </div>
      </div>
    </div>
  );
}
