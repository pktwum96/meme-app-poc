import { SupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../supabase/database.types";

export const getUserDetails = (
  client: SupabaseClient<Database>,
  userId: string
) => {
  return client.from("users").select("*").eq("id", userId).single();
};

export const getUserPreferences = (
  client: SupabaseClient<Database>,
  userId: string
) => {
  return client
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();
};
