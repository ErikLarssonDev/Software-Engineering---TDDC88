import { Button } from "@mui/material";
import React from "react";
import Add from "@mui/icons-material/Add";
/**
 *
 * @returns The add button component.
 */

/**
 * ...buttonProps makes the custom button clickable using onClick.
 */

const AddButton = ({ ...buttonProps }) => {
  return (
    <Button
      sx={{
        color: "black",
      }}
      {...buttonProps}
    >
      <Add
        sx={{
          fontSize: 30,
          boxShadow: 4,
        }}
      ></Add>
    </Button>
  );
};

export default AddButton;
