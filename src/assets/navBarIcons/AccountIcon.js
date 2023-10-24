import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

/**
 * 
 * @returns The account Icon for the Navbar component. 
 */

const AccountIcon = () => {
  return (
    <Link>
      <AccountCircleOutlinedIcon sx={{ fontSize: "60px", color: "black" }} />
    </Link>
  );
};

export default AccountIcon;
