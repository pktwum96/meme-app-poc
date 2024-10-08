import { LinkProps, Link as RouterLink } from "react-router-dom";

const Link = (props: LinkProps) => {
  return (
    <RouterLink
      className="link-component"
      {...props}
      style={{ textDecoration: "none" }}
    />
  );
};

export default Link;
