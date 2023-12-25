import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

function NavBar() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color={"transparent"}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 64,
              margin: "auto",
            }}
            onClick={() => {
              navigate("/");
            }}
            alt="Your logo."
            src={Logo}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
