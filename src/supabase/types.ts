import { Tables, TablesInsert, TablesUpdate } from "./database.types.ts";

// Row Data
export type UserDetails = Tables<"users">;
export type UserPreferences = Tables<"user_preferences">;

// Insert Data
export type UserDetailsInsert = TablesInsert<"users">;
export type UserPreferencesInsert = TablesInsert<"user_preferences">;

// Update Data
export type UserDetailsUpdate = TablesUpdate<"users">;
export type UserPreferencesUpdate = TablesUpdate<"user_preferences">;
