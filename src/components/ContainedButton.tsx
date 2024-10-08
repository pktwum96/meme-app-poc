import Button, { ButtonProps } from "@mui/material/Button";
import { useTheme } from "../contexts/theme";

export const ContainedButton = (props: ButtonProps) => {
  const { theme } = useTheme();
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        color: theme.palette.background.paper,
        background: theme.palette.text.primary,
        ...props.sx,
      }}
    />
  );
};
