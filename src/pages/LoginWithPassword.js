import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Typography, Button } from "@mui/material";
import ChooseStorageDialog from "../components/ChooseStorageDialog";
import Header from "../components/Header";
import ReportIcon from "@mui/icons-material/Report";
//import axios from "axios";
import NavBar from "../components/NavBar";
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FamilyRestroomOutlined } from "@mui/icons-material";
const LOGIN_URL = '/loginWithCredentials';

/**
 * This implements view 1.1 in the design where the user can log in using their user ID and password.
 */

const LoginWithPassword = () => {

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [costCenters, setCostCenters] = useState([]);
  const [openChooseStorageDialog, setOpenChooseStorageDialog] = useState(false);
  const [roleState, setRoleState] = useState('');

  const [notValidLogin, setNotValidLogin] = useState(false);
  useEffect(() => console.log(costCenters), [costCenters]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: username, password: password }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: false //temporary solution due to issues with CORS, for it to work with cookies this must be set to true.
        });


      const accessToken = response.data?.token;
      const storageId = response.data?.user.costCenters[0];
      const role = response?.data?.user?.role;
      setRoleState(role);
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("role", role);
      // sessionStorage.setItem("storageId", storageId)
      setAuth({ username, password, role, accessToken });
      setUsername("");
      setPassword("");
      setCostCenters(response.data?.user.costCenters);
      setOpenChooseStorageDialog(true); // show chooseStorage dialog

    } catch (err) {
      if (!err?.response) {
        setError('No server response');
      } else if (err.response?.status === 400) {
        setError('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setError('Unauthorized');
      } else {
        setError('Login failed');
      }
      setNotValidLogin(true);
    }
  }



  const loginMock = (e) => {
    e.preventDefault();
    axios.post(LOGIN_URL, {
      username,
      password
    }).then((response) => {
      localStorage.setItem("login", JSON.stringify({
        userLogin: true,
        token: response.data.access_token
      }))
      setError("");
      setUsername("");
      setPassword("");
      setNotValidLogin(false);
      navigate("/home");
    })
      .catch(error => {
        setUsername("");
        setPassword("");
        setError(error.response.data.message);
        setNotValidLogin(true);
      });

  };

  return (
    <Box>
      <NavBar />
      <Header />
      <Box
        marginTop={10}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
          Logga in för att fortsätta
        </Typography>
        <Box sx={{ width: "334px" }}>
          <Typography
            marginTop={3}
            sx={{ fontSize: "20px", fontWeight: "400", alignItems: "left" }}
          >
            Användar ID
          </Typography>
          <TextField
            error={notValidLogin}
            fullWidth
            id="username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
          <Typography
            marginTop={3}
            sx={{ fontSize: "20px", fontWeight: "400", alignItems: "left" }}
          >
            Lösenord
          </Typography>
          <TextField
            error={notValidLogin}
            fullWidth
            id="password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            helperText={
              notValidLogin === true ? (
                <Typography display={"flex"} alignItems={"center"}>
                  <ReportIcon /> Ogiltigt användar-ID eller lösenord
                </Typography>
              ) : (
                ""
              )
            }
          />
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
              onClick={handleSubmit}
            >
              Logga in
            </Button>
          </Box>
          <Box>
            <ChooseStorageDialog
              costCenters={costCenters}
              open={openChooseStorageDialog}
              role={roleState}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginWithPassword;
