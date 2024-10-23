import { useSessionContext } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function SupaBaseApp() {
  const { supabaseClient } = useSessionContext();
  return (
    <Auth
      supabaseClient={supabaseClient}
      socialLayout="horizontal"
      providers={["google"]}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
  );
}
