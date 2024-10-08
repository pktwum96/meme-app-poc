import { ThemeProvider as MuiThemeProvider, Theme } from "@mui/material/styles";
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { darkTheme } from "./dark-theme";

export interface ThemeContextProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}
const defaultContext = {
  theme: darkTheme,
  setTheme: () => {},
};

const ThemeContext = React.createContext<ThemeContextProps>(defaultContext);

export interface ThemeProviderProps extends PropsWithChildren {
  theme?: Theme;
}
export const useTheme = () => {
  return useContext(ThemeContext);
};
export const ThemeProvider = ({
  children,
  theme: defaultTheme = darkTheme,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
