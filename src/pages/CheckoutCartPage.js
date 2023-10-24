import * as React from 'react';
import NavBar from "../components/NavBar";
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import { Box, Typography } from "@mui/material";
import CartCard from "../components/CartCard";
import MediumButton from '../components/MediumButton';

/**
 * @param {products} param0 The products placed in the cart.
 * @param {numOfProducts} param1 The number of products placed in the cart.
 * @returns The CheckoutCart component.
 */


const CheckoutCart = ({
    products,
    numOfProducts
}) => {
    return (
        <Box>
            <NavBar left={<HomeIconOutlined sx={{ fontSize: "60px", color: 'black' }} />}
                right={<QrCodeScannerOutlinedIcon sx={{ fontSize: "60px", color: 'black' }} />} />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "350px",
                margin: "auto",
                alignItems: "center"
            }}
            >
                <Box>
                    <Typography sx={{
                        fontSize: "32px",
                        textAlign: "center",
                        fontFamily: 'Montserrat',
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "32px",
                        lineHeight: "39px",
                        mb: 2
                    }}>
                        Valda artiklar
                    </Typography>
                    <Typography sx={{ fontSize: "16px", textAlign: "left", ml: 1 }}>
                        {numOfProducts} 2 produkter

                    </Typography>
                    <hr style={{
                        color: 'black',
                        marginTop: "-2px"
                    }} />
                    <CartCard
                        productName={"Alvedon"}
                        lioNum={"1234-1337"}
                        numInCart={10}
                    />
                    <CartCard
                        productName={"Paracetamol"}
                        lioNum={"xxxx-xxxx"}
                        numInCart={20}
                    />
                </Box>
                <MediumButton text="Checka ut" bgColor="rgba(255, 255, 255)" boxShadow="4" />
            </Box>
        </Box >
    );
};

export default CheckoutCart;
