import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import regionLogo from "../assets/regionLogo.png";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

/**
 *
 * @returns The navbar component for the computer views.
 */
const NavBarComputer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);
  const economyOpen = Boolean(anchorEl2);

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
};


  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#D9ECFC" }}>
      <Button
        id="customized-button"
        aria-controls={open ? "customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="contained"
        sx={{
          backgroundColor: "#FFF",
          color: "#000",
          textTransform: "none",
          margin: "10px",
          borderRadius: "12px",
          fontWeight: 800,
        }}
      >
        Lager A
      </Button>
      <Menu
        id="customized-menu"
        MenuListProps={{ "aria-labelledby": "customized-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Lager B</MenuItem>
        <MenuItem onClick={handleClose}>Lager C</MenuItem>
        <MenuItem onClick={handleClose}>Lager D</MenuItem>
      </Menu>
      <Box sx={{ display: "flex", justifyContent: "center", mb: "20px" }}>
        <img src={regionLogo} alt="region-logo" />
      </Box>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          margin: "auto",
          width: "90%",
          maxWidth: "1137px",
          borderRadius: "12px",
          backgroundColor: "#FFF",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            <Typography variant="h6" component="div" sx={{ color: "#000" }}>
              Beställningar
            </Typography>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            <Typography variant="h6" component="div" sx={{ color: "#000" }}>
              Hantera lager
            </Typography>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            <Typography variant="h6" component="div" sx={{ color: "#000" }}>
              Uttag av artiklar
            </Typography>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            <Typography variant="h6" component="div" sx={{ color: "#000" }}>
              Sök artikel
            </Typography>
          </Link>
          <Link style={{ textDecoration: "none", color: "#000" }}>
            <Typography variant="h6" component="div" sx={{ color: "#000" }} id="economy-button"
              aria-controls={economyOpen ? 'economy-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={economyOpen ? 'true' : undefined}
              onClick={handleClick2}
            >
              Ekonomi
            </Typography>
            <Menu
              id="economy-menu"
              anchorEl={anchorEl2}
              open={economyOpen}
              onClose={handleClose2}
              MenuListProps={{
                'aria-labelledby': 'economy-button',
              }}
            >
              <Link to="/economy-history" style={{ textDecoration: "none", color: "#000" }}>
              <MenuItem onClick={handleClose2}>Historik</MenuItem>
              </Link>
              <Link to="/economy-today" style={{ textDecoration: "none", color: "#000" }}>
              <MenuItem onClick={handleClose2}>Nuläge</MenuItem>
              </Link>
            </Menu>


          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            <Typography variant="h6" component="div" sx={{ color: "#000" }}>
              Varukorg
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: "70%",
          display: "flex",
          margin: "auto",
          maxWidth: "1050px",
          mt: "10px",
          mb: "5px",
        }}
      >
        <Typography sx={{ fontSize: "19px", color: "#575757" }}>
          Placeholder &gt; Placeholder
        </Typography>
      </Box>
    </Box>
  );
};

export default NavBarComputer;
