import React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";

/**
 * 
 * @returns The AddIcon that is used in the NavBar to add orders, displayed on view S12
 */

const AddIcon = ({path}) => {
  return (
    <Link to={path}>
      <AddCircleOutlineIcon sx={{ fontSize: "55px", color: "black" }} />
    </Link>
  );
};

export default AddIcon;

