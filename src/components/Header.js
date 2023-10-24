import React from "react";
import regionLogo from "../assets/regionLogo.png";
import Box from "@mui/material/Box";

/**
 * This implements the header which includes the ÖGL logo and the NavBar component. 
 */


const Header = () => {
  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"}>
        <img src={regionLogo} alt='Regionens logo' />
      </Box>
    </Box>
  );
};

export default Header;
