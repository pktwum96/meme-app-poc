import DarkModeIcon from "@mui/icons-material/DarkMode";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import RouteIcon from "@mui/icons-material/Route";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemIcon, { ListItemIconProps } from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { SIDE_BAR_DRAWER_WIDTH } from "../constants";
import { useTheme } from "../contexts/theme";
import { darkTheme } from "../contexts/theme/dark-theme";
import { lightTheme } from "../contexts/theme/light-theme";

const openedMixin = (theme: Theme): CSSObject => ({
  width: SIDE_BAR_DRAWER_WIDTH,
  transition: theme.transitions.create(["width", "display"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create(["width", "display"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: SIDE_BAR_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));
interface StyledListItemIconProps extends ListItemIconProps {
  open: boolean;
}
const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledListItemIconProps>(({ open }) => {
  return {
    minWidth: 0,
    justifyContent: "center",
    marginRight: open ? 8 : 0,
  };
});

interface StyledListItemButtonProps extends ListItemButtonProps {
  open: boolean;
  to?: string;
}
const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledListItemButtonProps>(({ open }) => ({
  minHeight: 48,
  px: 2.5,
  justifyContent: open ? "initial" : "center",
}));

interface SideBarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavLinks = [
  {
    route: "./dashboard",
    name: "Dashboard",
    icon: <SpaceDashboardIcon />,
  },
  {
    route: "./tracks",
    name: "Tracks",
    icon: <RouteIcon />,
  },
  {
    route: "./community",
    name: "Community",
    icon: <PeopleIcon />,
  },
];

export const SideBar = ({ open, setOpen }: SideBarProps) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Drawer
      open={open}
      variant={"permanent"}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: theme.palette.background.paper,
          height: "100vh",
        },

        background: "pink!important",
        display: { xs: open ? "flex" : "none", sm: "flex" },
      }}
    >
      <Toolbar>
        <Typography variant="body1" noWrap component="div">
          Mid To Senior
        </Typography>
      </Toolbar>
      <List>
        {NavLinks.map((nav) => {
          const { route, name, icon } = nav;
          return (
            <ListItem key={route} disablePadding sx={{ display: "block" }}>
              <StyledListItemButton
                to={route}
                onClick={() => setOpen(false)}
                component={Link}
                open={open}
              >
                <Tooltip title={name}>
                  <StyledListItemIcon open={open}>{icon}</StyledListItemIcon>
                </Tooltip>
                <ListItemText
                  primary={name}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: open ? "block" : "none",
                  }}
                />
              </StyledListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ marginTop: "auto" }} />
      <List sx={{ display: open ? "flex" : "block" }}>
        <StyledListItemButton open={open}>
          <StyledListItemIcon open={open}>
            <NotificationIcon />
          </StyledListItemIcon>
        </StyledListItemButton>
        <StyledListItemButton
          open={open}
          onClick={() => {
            setTheme(isDark ? lightTheme : darkTheme);
          }}
        >
          <StyledListItemIcon open={open}>
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </StyledListItemIcon>
        </StyledListItemButton>
        <Link to={"/settings"}>
          <StyledListItemButton open={open}>
            <StyledListItemIcon open={open}>
              <SettingsIcon />
            </StyledListItemIcon>
          </StyledListItemButton>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <StyledListItemButton
            open={open}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <StyledListItemIcon open={open}>
              {open ? (
                <KeyboardDoubleArrowLeftIcon />
              ) : (
                <KeyboardDoubleArrowRightIcon />
              )}
            </StyledListItemIcon>
            <ListItemText
              primary={"Hide Sidebar"}
              sx={{
                opacity: open ? 1 : 0,
                display: open ? "block" : "none",
              }}
            />
          </StyledListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
