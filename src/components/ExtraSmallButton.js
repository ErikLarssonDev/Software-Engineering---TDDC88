import React from "react";
import { Box, Button, Typography } from "@mui/material";
/**
 *
 * @param {text} param0 A string that decides the text in the button.
 * @param {bgColor} param1 A color prop that determines the background color of the button.
 * @param {icon} param2 An icon that will be displayed right of the text.
 * @returns The extra small button component. (Used in view 8, could also be used in view 4, 10)
 */

/**
 * ...buttonProps makes the custom button clickable using onClick.
 */
const ExtraSmallButton = ({ text, bgColor, icon, ...buttonProps }) => { 
    return (
        <Box>
            <Button
                variant="contained"
                size="small"
                sx={{
                    color: "#000000",
                    backgroundColor: `${bgColor}`,
                    minWidth: "100px",
                    height: "34px",
                    textTransform: "none",
                    borderRadius: "12px",
                    margin: 1,

                }}
                
                {...buttonProps}
            >
                <Typography>
                    {text}
                </Typography>
                {icon}
            </Button>
        </Box>
    );
};

export default ExtraSmallButton;
