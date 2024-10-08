import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoDark from "../assets/logo-dark-mode.png";
import Logo from "../assets/logo.png";
import { useTheme } from "../contexts/theme";
import { darkTheme } from "../contexts/theme/dark-theme";
import { lightTheme } from "../contexts/theme/light-theme";
import { useUser } from "../supabase/useUser";
import { ContainedButton } from "./ContainedButton";

function NavBar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { supabaseClient } = useSessionContext();

  const { theme, setTheme } = useTheme();

  const settings = [
    {
      title: "Logout",
      action: async () => {
        const logout = await supabaseClient.auth.signOut();
        if (!logout.error) navigate("/login");
      },
    },
  ];

  const { userDetails } = useUser();

  return (
    <AppBar position="static" color={"transparent"}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              height: 64,
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <Box
              component={"img"}
              sx={{ height: "100%", padding: 2 }}
              src={theme.palette.mode === "dark" ? LogoDark : Logo}
            />
            <Typography
              sx={{ display: { xs: "none", md: "block" } }}
              fontFamily={"Alumni Sans"}
              variant="h5"
            >
              jollof memes
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={() => {
                setTheme(
                  theme.palette.mode === "dark" ? lightTheme : darkTheme
                );
              }}
            >
              {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>

            {userDetails ? (
              <>
                <Button sx={{ color: "inherit" }}>My memes</Button>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={userDetails.full_name}
                      src={userDetails.avatar_url}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.title} onClick={setting.action}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <ContainedButton
                onClick={() => {
                  navigate("/login");
                }}
              >
                {" "}
                Sign In
              </ContainedButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
