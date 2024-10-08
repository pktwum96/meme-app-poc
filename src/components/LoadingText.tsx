import { Skeleton } from "@mui/material";
import Typography, { TypographyProps } from "@mui/material/Typography";

const LoadingText = ({
  loading,
  children,
  ...props
}: TypographyProps & { loading: boolean }) => {
  return (
    <Typography {...props}>{loading ? <Skeleton /> : children}</Typography>
  );
};

export default LoadingText;
