import * as React from "react";
import { useMemo, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

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

const ResponsiveAppBar = ({
  setSelectedRows,
  handleUndo,
  handleRedo,
  setSearchResultsForCars,
  setSearchResultsForCards,
  setTransactionBetweenSums,
}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    if (event) {
      let newSearchQuery = event.target.value;
      const response = await fetch(
        `https://django-car-service-api.herokuapp.com/search/?text=${newSearchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setSearchResultsForCars(data.cars);
      setSearchResultsForCards(data.cards);

      navigate("/search");
    }
  };

  const debouncedChangeHandler = useMemo(() => {
    return debounce(handleSearch, 300);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  });

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
            <Button
              onClick={() => setSelectedRows([])}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={`/cars`}
              >
                Cars
              </Link>
            </Button>
            <Button
              onClick={() => setSelectedRows([])}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={`/cards`}
              >
                Cards
              </Link>
            </Button>
            <Button
              onClick={() => setSelectedRows([])}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => setTransactionBetweenSums([])}
                to={`/transactions`}
              >
                Transactions
              </Link>
            </Button>
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
              onChange={debouncedChangeHandler}
            />
          </Search>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
