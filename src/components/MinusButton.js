import { Button } from "@mui/material";
import React from "react";
import Remove from '@mui/icons-material/Remove';
/**
 * 
 * @returns The minus button component.
 */

/**
 * ...buttonProps makes the custom button clickable using onClick.
 */

const MinusButton = ({ ...buttonProps }) => {
    return (
        <Button
            sx={{
                color: 'black'
            }} {...buttonProps}>
            <Remove sx={{
                fontSize: 30,
                boxShadow: 4
            }}>
            </Remove>
        </Button>
    );
};

export default MinusButton;
