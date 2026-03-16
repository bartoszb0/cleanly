import { createClient } from "../supabase/server";

export const getOpinion = async (jobId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("opinions")
    .select(`*, customers (full_name)`)
    .eq("job_id", jobId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
};
