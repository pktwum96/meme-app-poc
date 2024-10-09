import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Text from "../../components/Text";
import { usePageTitle } from "../../helpers/utils";
import LoginInButton from "./LoginButton";

export const Login = () => {
  usePageTitle("Login");

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box width={"100%"} textAlign={"center"}>
        <Text fontSize={60} padding={4}>
          Login
        </Text>
        <LoginInButton />
      </Box>
      <Divider
        orientation="vertical"
        sx={{
          display: {
            xs: "none", // Will be hidden on small screens (xs and up)
            // md: "block", // Will be shown on medium screens (md and up)
          },
          padding: 2,
        }}
      />
      <Box
        width={"100%"}
        sx={{
          display: {
            xs: "none", // Will be hidden on small screens (xs and up)
            // md: "block", // Will be shown on medium screens (md and up)
          },
        }}
      >
        heeerr
      </Box>
    </Container>
  );
};
