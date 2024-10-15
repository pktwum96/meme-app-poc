import { Skeleton } from "@mui/material";
import { TypographyProps } from "@mui/material/Typography";
import Text from "./Text";

const LoadingText = ({
  loading,
  children,
  ...props
}: TypographyProps & { loading: boolean }) => {
  return <Text {...props}>{loading ? <Skeleton /> : children}</Text>;
};

export default LoadingText;
