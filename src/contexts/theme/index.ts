import { useContext } from "react";
import { ThemeContext } from "./theme-provider";

export const useTheme = () => {
  return useContext(ThemeContext);
};
