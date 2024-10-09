import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { client } from "../../supabase/SupabaseProvider";

export default function SupaBaseApp() {
  return (
    <Auth
      supabaseClient={client}
      socialLayout="horizontal"
      providers={["google"]}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
  );
}
