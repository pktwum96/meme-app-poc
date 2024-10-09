import { SupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../supabase/database.types";
import { MemeInsert } from "../supabase/types";

export const getAllMemes = (client: SupabaseClient<Database>) => {
  return client.from("memes").select("*").eq("status", "published");
};

export const getAllMyMemes = (
  client: SupabaseClient<Database>,
  userId: string
) => {
  return client.from("memes").select("*").eq("created_by", userId);
};

export const uploadMemeToSupabase = (
  client: SupabaseClient<Database>,
  selectedFile: File,
  filePath: string
) => {
  return client.storage
    .from("Meme_Bucket") // 'memes' is your storage bucket name
    .upload(filePath, selectedFile);
};

export const createMemeInDatabase = (
  client: SupabaseClient<Database>,
  meme: MemeInsert
) => {
  return client.from("memes").insert(meme);
};
