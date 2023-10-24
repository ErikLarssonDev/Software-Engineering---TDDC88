import React from "react";
import { Box, Button, Typography } from "@mui/material";
/**
 *
 * @param {text} param0 A string that decides the text in the button.
 * @param {bgColor} param1 A color prop that determines the background color of the button.
 * @returns The small button component.
 */

/**
 * ...buttonProps makes the custom button clickable using onClick.
 */
const SmallButton = ({ text, bgColor, ...buttonProps }) => {
  return (
    <Box>
      <Button
        variant="contained"
        size="small"
        sx={{
          color: "#000000",
          backgroundColor: `${bgColor}`,
          minWidth: "116.45px",
          height: "50px",
          textTransform: "none",
          borderRadius: "12px",
          margin: 1,
        }}
        {...buttonProps}
      >
        <Typography variant="h6" fontWeight={200}>{text}</Typography>
      </Button>
    </Box>
  );
};

export default SmallButton;
