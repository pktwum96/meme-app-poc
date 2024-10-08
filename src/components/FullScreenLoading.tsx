import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import CircleLoader from "react-spinners/CircleLoader";
import { useTheme } from "../contexts/theme";
import { useUser } from "../supabase/useUser";

export const FullScreenLoading = () => {
  const { isLoading } = useUser();
  const { theme } = useTheme();
  return isLoading ? (
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
        loading={isLoading}
        size={"5rem"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  ) : null;
};
