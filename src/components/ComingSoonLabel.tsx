import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";
import { useTheme } from "../contexts/theme";

const ComingSoonLabel = () => {
  const { theme } = useTheme();
  return (
    <Box
      position={"absolute"}
      width={"100%"}
      height={"100%"}
      bgcolor={alpha(theme.palette.background.default, 0.65)}
      display={"flex"}
      justifyContent={"flex-end"}
    >
      <Chip
        label="Coming Soon"
        color="warning"
        size="small"
        sx={{ margin: 2 }}
      />
    </Box>
  );
};

export default ComingSoonLabel;
