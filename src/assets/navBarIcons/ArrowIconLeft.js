import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

/**
 * 
 * @returns The ArrowIconLeft component which is displayed on view 4, 4.4 and view 5 and takes the user back to the ScanArticlePage when clicked on.
 */

const ArrowIconLeft = ({path}) => {
  return (
    <Link to={path}>
      <ArrowBackIcon sx={{ fontSize: "60px", color: "black" }} />
    </Link>
  );
};

export default ArrowIconLeft;
