import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import { FC, ReactNode } from "react";
import { Database } from "./database.types";

interface SupabaseProviderProps {
  children: ReactNode;
}

export const client = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL || "fsda",
  import.meta.env.VITE_SUPABASE_KEY || "fasdf"
);

const SupabaseProvider: FC<SupabaseProviderProps> = ({ children }) => {
  return (
    <SessionContextProvider supabaseClient={client}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
