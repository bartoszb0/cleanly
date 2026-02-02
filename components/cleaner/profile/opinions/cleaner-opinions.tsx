import { getCleanerOpinions } from "@/lib/data/cleaners";
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
      <h1 className="text-3xl font-bold">Opinions</h1>
      <CleanerOpinionsList
        cleanerId={id}
        initialOpinions={opinions}
        totalCount={count}
      />
    </div>
  );
}
