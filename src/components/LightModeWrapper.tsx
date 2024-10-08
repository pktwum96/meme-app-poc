import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../contexts/theme";
import { lightTheme } from "../contexts/theme/light-theme";

export const LightModeWrapper = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Outlet />
    </ThemeProvider>
  );
};
