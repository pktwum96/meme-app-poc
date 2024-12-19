import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#000000",
    },
    primary: {
      main: "#fffd",
    },
  },
  typography: {
    fontFamily: "Geist",
  },
});
