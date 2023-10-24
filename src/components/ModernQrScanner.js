import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import QrReader from "react-web-qr-reader";


/**
 *
 * @param {onScan function} param0 A function that defines what happens when an item is scanned.
 * @param {string} param1 A title for the page.
 * @returns The ModernQrScanner component. This component alows you to scan QR codes and extract the information. As of now this is only logged in the console but this will be changed when the global cart state is set up.
 */

const ModernQrScanner = ({ onScan, title }) => {
  const handleScan = async (scannedData) => {
    onScan(scannedData);
  };

  const handleError = (err) => {
        console.error(err);
       
        
      }

  

  return (
    <Box
      marginLeft={1}
      marginRight={1}
      marginTop={3}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Montserrat",
          fontSize: "32px",
          fontWeight: 600,
          lineHeight: "39px",
          letterSpacing: "0em",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <QrReader
        delay={300}
        facingMode={"environment"}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "90%" }}
      />
    </Box>
  );
};

export default ModernQrScanner;
