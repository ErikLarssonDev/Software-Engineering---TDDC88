
import Logout from '@mui/icons-material/Logout';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom"
import React from 'react'

/**
 * 
 * @returns The account Icon for the Navbar component. 
 */

 const LogoutNurseIcon = () => {
    return (
      <Link to = "/login">
         <LogoutIcon sx={{ fontSize: "60px", color: "black" }} onClick={() => sessionStorage.clear()} />
      </Link>
    );
  };
  
  export default LogoutNurseIcon;