import { SupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../supabase/database.types";
import { Meme, MemeUpdate, MemeWithAssociations } from "../supabase/types";

export const getAllMemes = (client: SupabaseClient<Database>) => {
  return client
    .from("memes")
    .select(
      `*,
    tags (name),
    characters (*)`
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });
};

export const getMemeById = (
  client: SupabaseClient<Database>,
  memeId: string
) => {
  return client
    .from("memes")
    .select(
      `*,
      tags (name),
      characters (*)`
    )
    .eq("id", memeId)
    .single();
};

export const getAllMyMemes = (
  client: SupabaseClient<Database>,
  userId: string
) => {
  return client
    .from("memes")
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });
};

export const searchMemes = (
  client: SupabaseClient<Database>,
  queryString: string,
  filter: {
    mediaType?: string;
    tags?: string[];
    characters?: string[];
  }
) => {
  const { mediaType, tags, characters } = filter;
  let query = client
    .from("memes")
    .select(
      `*,
      tags (name),
      characters (*)`
    )

    .eq("status", "published")
    .filter("description", "ilike", `%${queryString}%`)
    .or(
      `languages.cs.{${queryString}}, media_type.ilike.%${queryString}%, title.ilike.%${queryString}%`
    );

  if (mediaType) {
    query = query.eq("media_type", mediaType);
  }

  // Add tags filter
  if (tags?.length) {
    query = query.contains(
      "tags",
      tags.map((tag) => ({ name: tag }))
    );
  }

  // Add characters filter
  if (characters?.length) {
    query = query.contains(
      "characters",
      characters.map((char) => ({ name: char }))
    );
  }
  return query.order("published_at", { ascending: true });
};

export const getAllMyMemesInReview = (
  client: SupabaseClient<Database>,
  reviewerId: string
) => {
  return client
    .from("memes")
    .select("*")
    .eq("status", "review")
    .not("created_by", "eq", reviewerId);
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

export const createOrUpdateMemeInDatabase = (
  client: SupabaseClient<Database>,
  meme: Omit<MemeWithAssociations, "id"> & { id?: string }
) => {
  return client
    .rpc("insert_or_update_meme_v4", {
      p_created_by: meme.created_by,
      p_description: meme.description,
      p_title: meme.title,
      p_languages: meme.languages || [],
      p_media_path: meme.media_path,
      p_media_type: meme.media_type,
      p_media_url: meme.media_url,
      p_meme_id: meme.id,
      p_tags: meme.tags,
      p_characters: meme.characters,
    })
    .single();
};

export const deleteMeme = (
  client: SupabaseClient<Database>,
  meme: MemeUpdate
) => {
  return client.from("memes").delete().eq("id", `${meme.id}`);
};

export const submitMemeForReview = (
  client: SupabaseClient<Database>,
  meme: Meme
) => {
  return client
    .from("memes")
    .update({
      status: "review",
      created_by: meme.created_by,
    })
    .eq("id", meme.id)
    .select("*")
    .single();
};

export const approveMeme = (client: SupabaseClient<Database>, meme: Meme) => {
  return client
    .from("memes")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
    })
    .eq("id", meme.id)
    .select("*")
    .single();
};

export const rejectMeme = (client: SupabaseClient<Database>, meme: Meme) => {
  return client
    .from("memes")
    .update({
      status: "rejected",
    })
    .eq("id", meme.id)
    .select("*")
    .single();
};
