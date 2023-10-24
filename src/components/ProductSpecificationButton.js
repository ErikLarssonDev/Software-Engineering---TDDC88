import React from "react";
import { Button, Typography } from "@mui/material";

/*
A part of the product specifcation, generic button passing on props 
@param which text is to be displayed on button
@param which color the button should have 

*/

const ProductSpecificationButton = ({ text, bgColor, ...buttonProps }) => {

    return (

        <Button 
        
        sx={{ 
            ':hover': {
                backgroundColor: `${bgColor}`,
                opacity: 0.75
            },
            mt: 2, width: "90%" ,
            height: '60px',
            color: 'black',
            backgroundColor: `${bgColor}`,
            boxShadow: 4,
            border: 1, 
            borderColor: "#D0D4D9",
            textTransform: 'none',
        }}  variant="contained"
        {...buttonProps}

       >
            <Typography>{text}</Typography>
            
        </Button>

    );
};
export default ProductSpecificationButton;