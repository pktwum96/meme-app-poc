import { Tables, TablesInsert, TablesUpdate } from "./database.types.ts";

// Row Data
export type UserDetails = Tables<"users">;
export type UserPreferences = Tables<"user_preferences">;
export type Meme = Tables<"memes">;

// Insert Data
export type UserDetailsInsert = TablesInsert<"users">;
export type UserPreferencesInsert = TablesInsert<"user_preferences">;
export type MemeInsert = TablesInsert<"memes">;

// Update Data
export type UserDetailsUpdate = TablesUpdate<"users">;
export type UserPreferencesUpdate = TablesUpdate<"user_preferences">;
export type MemeUpdate = TablesUpdate<"memes">;
