import { LinkProps, Link as RouterLink } from "react-router-dom";

export const Link = (props: LinkProps) => {
  return (
    <RouterLink
      className="link-component"
      {...props}
      style={{ textDecoration: "none" }}
    />
  );
};
