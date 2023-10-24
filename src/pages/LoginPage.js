import React from "react";
import Box from "@mui/material/Box";
import { TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import Header from "../components/Header";
import ReportIcon from "@mui/icons-material/Report";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar"
import BarcodeScanner from "../components/barcode";

/**
 * This implements view 1 in the design where the user can log in using barcode or go to login with password (this REQ MIGHT CHANGE or no longer be necessary)
 */
 
const LoginPage = () => {
  const [stopStream, setStopStream] = useState(false)
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    userID: "",
    password: "",
  });

  const [notValidLogin, setNotValidLogin] = useState(false);

  const goToLoginPassword = () => {
      navigate("/login-password")
  };

  return (
    <Box>
      <NavBar/>
      <Header />
      
      <Box
        marginTop={10}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
          Logga in för att fortsätta
        </Typography>
        <BarcodeScanner/>
      </Box>
      
      <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button 
              variant="contained"
              size="medium"
              sx={{
                mt: 3,
                mb: 2,
                color: "black",
                bgcolor: "white",
                width: "231px",
                height: "52px",
              }}
              onClick={goToLoginPassword}
            >
              Logga in manuellt
            </Button>
          </Box>
    </Box>
    
  );
};

export default LoginPage;