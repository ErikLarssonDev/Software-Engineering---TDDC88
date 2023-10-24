import React from "react";
import Box from "@mui/material/Box";

/**
 * 
 * @param {leftIcon} param0 Sets the left icon in the navbar.
 * @param {rightIcon} param1 Sets the right icon in the navbar.
 * @returns The navbar component. 
 */

const NavBar = ({leftIcon, rightIcon }) => {
  return (
    <Box height="100px" display={"flex"} justifyContent={"space-between"} alignItems={'center'} marginLeft={2} marginRight={2} >
        {leftIcon}
        {rightIcon}
    </Box>
  );
};

export default NavBar;
