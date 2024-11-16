import { SupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../supabase/database.types";

export const getAllTags = (client: SupabaseClient<Database>) => {
  return client.from("tags").select("*");
};

export const getAllCharacters = (client: SupabaseClient<Database>) => {
  return client.from("characters").select("*");
};
