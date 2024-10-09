import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./contexts/loading";
import { ThemeProvider } from "./contexts/theme";
import ToasterProvider from "./contexts/toast";
import { Root } from "./routes/Root";
import SupabaseProvider from "./supabase/SupabaseProvider";
import { UserProvider } from "./supabase/useUser";

const App = () => {
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

export default App;
