import { ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode } from "react";
import { useTheme } from "../contexts/theme/theme-provider";
import { ContainedButton } from "./ContainedButton";

interface ResponsiveIconButtonProps extends ButtonProps {
  icon: ReactNode;
  label: string;
}
export const ResponsiveIconButton = ({
  icon,
  label,
  ...props
}: ResponsiveIconButtonProps) => {
  const { theme } = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return isSmallScreen ? (
    <IconButton {...props}>{icon}</IconButton>
  ) : (
    <ContainedButton startIcon={icon} {...props}>
      {label}
    </ContainedButton>
  );
};
