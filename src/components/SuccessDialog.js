import React from "react";
import { Typography, Box, Dialog } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CloseIcon from '@mui/icons-material/Close';
/**
 *
 * @param {message} param0 A string that decides the text on the success dialog.
 * @param {open} param1 A state prop that triggers the success dialog to show.
 * @param {succes} param2 bool if we want to see success of fail message
 * @returns The success dialog.
 */

/* 
  This component is used in the views 4.1, 5.1 and 9.1. 
  To use this component, the parent has to declare this component as:

        <SuccessDialog message="Your message" open={showDialog} success={true or false}/>
        success is true or false depending of if you want to show failiure message or success message

  The parent also needs a corresponding useState, such as:

        const [showDialog, setShowDialog] = useState(false);

  And a function for handling onClick on the corresponding button, such as:

        const handleClick = () => {
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
            navigate("/your-path")    // if you want to redirect to another page when the dialog disappears.
          }, 3000)
        }
  If you want to use 'navigate', you have to import { useNavigate } from "react-router-dom", and declare
  a variable as 'const navigate = useNavigate();'.
*/ 

//Icon on dialog is dependent on the type of dialog you want to show
const Icon = ({failiureBool}) => {
  if (!failiureBool){
    
   return (<CheckBoxOutlinedIcon
    
          sx={{
            color: "#17CD8C",
            width: "60px",
            height: "60px",
            marginLeft: "20px",
          }}
          />
   )
  }
  else {
   
      return(<CloseIcon
      sx={{
        color: "#B80202",
        width: "60px",
        height: "60px",
        marginLeft: "20px",
      }}
      />
      )
  }
}

//Depending on what type of dialog we want to use we end success true ore false
const SuccessDialog = ({ message, open, failiure }) => {
  var dialogColor = "";
  
  
  if (failiure) {
    dialogColor = "#FFD6D6"; 
  } else{
    dialogColor ="#E0FFE3"
  }

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          width: "333px",
          height: "191px",
          backgroundColor: dialogColor,
          borderRadius: "12px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Icon failiureBool={failiure}/>
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 400,
            textAlign: "center",
            width: "70%",
          }}
        >
          {message}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default SuccessDialog;
