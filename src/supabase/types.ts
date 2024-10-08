import { Tables, TablesInsert, TablesUpdate } from "./database.types.ts";

// Row Data
export type Track = Tables<"tracks">;
export type Module = Tables<"modules">;
export type Exercise = Tables<"exercises">;
export type UserDetails = Tables<"users">;
export type UserPreferences = Tables<"user_preferences">;
export type UserExercise = Tables<"user_exercises">;
export type UserTrack = Tables<"user_tracks">;
export type UserModule = Tables<"user_modules">;

// Insert Data
export type UserDetailsInsert = TablesInsert<"users">;
export type UserPreferencesInsert = TablesInsert<"user_preferences">;
export type UserTracksInsert = TablesInsert<"user_tracks">;
export type UserModulesInsert = TablesInsert<"user_modules">;

// Update Data
export type UserDetailsUpdate = TablesUpdate<"users">;
export type UserPreferencesUpdate = TablesUpdate<"user_preferences">;
export type UserModulesUpdate = TablesUpdate<"user_modules">;
export type UserTracksUpdate = Tables<"user_tracks">;
