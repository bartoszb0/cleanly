import { Tables } from "./supabase";

export type Customer = Tables<"customers">;

export type Opinion = {
  id: string;
  rating: number;
  content: string;
  created_at: string;
  customers: {
    full_name: string;
  };
};

export type OpinionSortOption = "newest" | "oldest" | "lowest" | "highest";
