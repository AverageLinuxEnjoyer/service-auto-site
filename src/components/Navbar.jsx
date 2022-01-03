import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";

const pages = ["cars", "cards", "transactions"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

class PageState {
  static handleCarsMenu = () => {
    fetch("http://localhost:8000/car/list").then(function (response) {
      const obj = response.json();
    });
  };

  static handleCardsMenu = () => {
    fetch("http://localhost:8000/card/list").then(function (response) {
      const obj = response.json();
    });
  };

  static handleTransactionsMenu = () => {
    fetch("http://localhost:8000/transaction/list").then(function (response) {
      const obj = response.json();
    });
  };

  static handleMenus = [
    PageState.handleCarsMenu,
    PageState.handleCardsMenu,
    PageState.handleTransactionsMenu,
  ];
}

const ResponsiveAppBar = ({ setSelectedRows, handleUndo, handleRedo }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Service Auto
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Service Auto
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                key={page}
                onClick={() => setSelectedRows([])}
                // onClick={PageState.handleMenus[i]}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={page}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <MenuItem key="Undo" onClick={handleUndo}>
            <Typography textAlign="center">Undo</Typography>
          </MenuItem>

          <MenuItem key="Redo" onClick={handleRedo}>
            <Typography textAlign="center">Redo</Typography>
          </MenuItem>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
