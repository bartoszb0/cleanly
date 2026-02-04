import { Tables } from "./supabase";

export type Customer = Tables<"customers">;

export type Opinion = Tables<"opinions"> & {
  customers: {
    full_name: string;
  };
  userVote: "like" | "dislike" | null;
};

export type OpinionSortOption = "newest" | "oldest" | "lowest" | "highest";

export type OpinionVoteType = "like" | "dislike";
