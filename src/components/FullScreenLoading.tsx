import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import CircleLoader from "react-spinners/CircleLoader";
import { useTheme } from "../contexts/theme/theme-provider";

export const FullScreenLoading = () => {
  const { theme } = useTheme();
  return (
    <Box
      zIndex={1000}
      bgcolor={alpha(theme.palette.background.default, 0.5)}
      position={"absolute"}
      width={"100%"}
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircleLoader
        color={theme.palette.text.primary}
        loading={true}
        size={"5rem"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  );
};
