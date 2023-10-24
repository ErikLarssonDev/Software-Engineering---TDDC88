import React from "react";
import HomeIconOutlined from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";

/**
 * 
 * @returns The home icon used in the navbar. Takes the user to the HomePage onClick.
 */

const HomeIcon = () => {
  const role = sessionStorage.getItem("role");
  if (role == 1) {
    return (
      <Link to="/home">
        <HomeIconOutlined sx={{ fontSize: "60px", color: "black" }} />
      </Link>
    );
  } else if (role == 2 || role == 3) {
    return (
      <Link to="/home-inventory">
        <HomeIconOutlined sx={{ fontSize: "60px", color: "black" }} />
      </Link>
    );
  } else {
    return (
    <Link to="/login">
      <HomeIconOutlined sx={{ fontSize: "60px", color: "black" }} />
    </Link>
    )
  }
  
};

export default HomeIcon;
