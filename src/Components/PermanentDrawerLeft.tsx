import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GsynergyLogo from "../assets/GsynergyLogo.svg";

import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart"; // planning
import BarChartIcon from "@mui/icons-material/BarChart"; //chart
import InventoryIcon from "@mui/icons-material/Inventory";
import { Outlet } from "react-router";
import { CssBaseline } from "@mui/material";
import { NavLink } from "react-router";

let sideBarArray = [
  { name: "Store", icon: StoreIcon, link: "/" },
  { name: "SKU", icon: InventoryIcon, link: "/sku" },
  { name: "Planning", icon: InsertChartIcon, link: "/planning" },
  { name: "Chart", icon: BarChartIcon, link: "/charts" },
];

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <img
            src={GsynergyLogo}
            alt="Gsynergy-logo"
            style={{ height: "150px", width: "150px" }}
          />
          <Divider />
          <Divider />
          <List>
            {sideBarArray.map((el) => (
              <ListItem key={el.name} disablePadding>
                <NavLink
                  to={el.link!!}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <ListItemButton>
                    <ListItemIcon>{<el.icon />}</ListItemIcon>
                    <ListItemText primary={el.name} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box
          sx={{
            flexGrow: 1, // Take up the remaining space
            paddingLeft: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ paddingTop: "2rem", fontSize: "2rem", textAlign: "center" }}
          >
            Data Views here
          </Typography>

          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}
