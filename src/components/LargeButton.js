import { Box, Button, Typography } from "@mui/material";
import React from "react";
/**
 * 
 * @param {text} param0 A string that decides the text in the button.
 * @param {icon} param1 An icon that will be displayed right of the text.
 * @returns The large button component.
 */
const LargeButton = ({ text, icon, ...buttonProps }) => {
  return (
    <Box >
      <Button
        variant="contained"
        size="large"
        sx={{
          color: "black",
          bgcolor: "white",
          width: "300px",
          height: "110px",
          fontSize: "30px",
          m: 1,
        }}
        {...buttonProps}
      >
        <Typography variant="h5" marginRight={1}>{text}</Typography>
        {icon}
      </Button>
    </Box>
  );
};

export default LargeButton;
