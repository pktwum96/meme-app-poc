import Skeleton from "@mui/material/Skeleton";
import { TypographyProps } from "@mui/material/Typography";
import { Text } from "./Text";

export const LoadingText = ({
  loading,
  children,
  ...props
}: TypographyProps & { loading: boolean }) => {
  return <Text {...props}>{loading ? <Skeleton /> : children}</Text>;
};
