import { getCleanerOpinions } from "@/lib/data/cleaners";
import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import CleanerOpinionsList from "./cleaner-opinions-list";

export default async function CleanerOpinions({ id }: { id: string }) {
  const data = await getCleanerOpinions(id, 0, 4);

  if (!data) {
    return notFound();
  }

  const { opinions, count } = data;

  if (!count || count === 0) {
    return (
      <p className="text-center mt-12 text-2xl italic text-slate-500">
        No opinions found
      </p>
    );
  }

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Opinions</h1>
        <div className="flex items-center gap-3 bg-slate-700/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-6 py-4 transition-all duration-300">
          <StarIcon className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          <span className="text-2xl font-semibold text-slate-100">
            {(
              opinions.reduce((acc, op) => acc + op.rating, 0) / opinions.length
            ).toFixed(1)}
          </span>
          <div className="h-6 w-px bg-slate-700/50" />
          <span className="text-sm text-slate-400">
            {opinions.length} reviews
          </span>
        </div>
      </div>
      <CleanerOpinionsList
        cleanerId={id}
        initialOpinions={opinions}
        totalCount={count}
      />
    </div>
  );
}
