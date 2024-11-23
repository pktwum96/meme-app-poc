import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { LoadingProvider } from "./contexts/loading/LoadingProvider";
import { ThemeProvider } from "./contexts/theme/theme-provider";
import { ToasterProvider } from "./contexts/toast";
import { Root } from "./routes/Root";
import { SupabaseProvider } from "./supabase/SupabaseProvider";
import { UserProvider } from "./supabase/user-provider";

export const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <LoadingProvider>
        <SupabaseProvider>
          <UserProvider>
            <BrowserRouter>
              <ToasterProvider />
              <Root />
            </BrowserRouter>
          </UserProvider>
        </SupabaseProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};
