import { SupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../supabase/database.types";

export const getAllTags = (client: SupabaseClient<Database>) => {
  return client.from("tags").select("*");
};
