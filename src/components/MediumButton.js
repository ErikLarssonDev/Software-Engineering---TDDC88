import { Box, Button, Typography } from "@mui/material";
import React from "react";
/**
 *
 * @param {text} param0 A string that decides the text in the button.
 * @param {bgColor} param1 A color prop that determines the background color of the button.
 * @returns The medium button component.
 */

/**
 * ...buttonProps makes the custom button clickable using onClick.
 */
const MediumButton = ({ text, bgColor, ...buttonProps }) => {
  return (
    <Box>
      <Button
        variant="contained"
        size="medium"
        sx={{
          color: "#000000",
          backgroundColor: `${bgColor}`,
          width: "90%",
          minWidth: "300px",
          height: "63px",
          textTransform: "none",
          borderRadius: "12px",
          margin: 1,
        }}
        {...buttonProps}
      >
        <Typography variant="h5" fontWeight="bold">
          {text}
        </Typography>
      </Button>
    </Box>
  );
};

export default MediumButton;
