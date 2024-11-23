import { useSessionContext } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useTheme } from "../../contexts/theme";

export function LoginInButton() {
  const { supabaseClient } = useSessionContext();

  const { theme } = useTheme();
  return (
    <Auth
      supabaseClient={supabaseClient}
      socialLayout="horizontal"
      providers={["google"]}
      appearance={{ theme: ThemeSupa }}
      view="magic_link"
      showLinks={false}
      theme={theme.palette.mode}
    />
  );
}
