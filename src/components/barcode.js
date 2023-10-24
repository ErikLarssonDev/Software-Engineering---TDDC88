import React, { useState } from "react";
import { useZxing } from "react-zxing";
import { Box } from "@mui/material";
import { Login } from "@mui/icons-material";
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ChooseStorageDialog from "../components/ChooseStorageDialog";
import SuccessDialog from "./SuccessDialog";

const LOGIN_URL = '/loginWithBarcode';

export const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [notValidLogin, setNotValidLogin] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [costCenters, setCostCenters] = useState(['Standard']);
  const [openChooseStorageDialog, setOpenChooseStorageDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [roleState, setRoleState] = useState('');


  async function Login(result){
    
    var res=result.text
    try {

      const response = await axios.post(
        LOGIN_URL, JSON.stringify({barcodeId: res}),
        {headers: {'Content-Type': 'application/json'}, withCredentials: false //temporary solution due to issues with CORS, for it to work with cookies this must be set to true.
        } );
 
      const accessToken = response.data?.token;
      const role = response?.data?.user?.role;
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("role", role);

      setAuth({ res, role, accessToken}); 
      setRoleState(role);
      setCostCenters(response.data?.user.costCenters);
      setCostCenters(response.data?.user.costCenters);
      setOpenChooseStorageDialog(true);
      } catch (err) {
        if (!err?.response) {
          setError('No server response');
        } else if (err.response?.status === 400) {
          setError('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setShowDialog(true);
          setTimeout(() => {
          setShowDialog(false);
        }, 3000);
          setError('Unauthorized');
        } else {
          setError('Login failed');
        }
        setNotValidLogin(true);

    }

  }


  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
      Login(result)
    },
  });

  return (
    <Box>
    <Box 
    
    display={"flex"}
    justifyContent={"center"}
    allignItems={"center"}>
    
      <video id="video" width="60%" height="auto" ref={ref}></video>
   
    </Box>
    <Box>
    <SuccessDialog
        message="Ogilltigt användar-ID"
        open={showDialog}
        failiure={true}
      />
    <ChooseStorageDialog
              costCenters={costCenters}
              open={openChooseStorageDialog}
              role={roleState}
            />
          </Box>
       
    </Box>
    
  );
};
export default BarcodeScanner;
