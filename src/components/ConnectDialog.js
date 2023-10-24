import React from "react";
import { Typography, Box, Dialog } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallButton from "./SmallButton";
import SuccessDialog from "./SuccessDialog";
import MediumButton from "./MediumButton";
/**
 *
 * @param {message} param0 A string that decides the text on the confirm dialog.
 * @param {open} param1 A state prop that triggers the confirm dialog to show on click.
 * @param {onClose} param2 A state prop that triggers the confirm dialog to hide on click.
 * @param {targetPage} param3 An optional path if you want to redirect the user to another page.
 * @param {successMessage} param4 A string that decides the displayed message on success.
 * @param {defaultButtons} param5 A boolean that decides if were to use the default layout of buttons or not. 
 * If true display smallbuttons "Ja" and "Nej". If false only display mediumbutton with text "Bekräfta".
 * @returns The confirm dialog.
 */

/* 
  This component is used in the views 4.2, 4.2.1, 4.3, 4.3.1, 9.2 and 9.2.2.
  To use this component, the parent has to declare this component as:

        <ConfirmDialog 
          message="Your message" 
          open={showDialog} 
          onClose={() => setShowDialog(false)}
          targetPage="/your-path"   // add path if you want to redirect to another page when the dialog disappears.
          successMessage="Your success message"
        />

  The parent also needs a corresponding useState, such as:

        const [showDialog, setShowDialog] = useState(false);

  And a function for handling onClick on the corresponding button, such as:

        const handleClick = () => {
          setShowDialog(true)
        }
*/

const ConfirmDialog = ({
  message,
  article,
  lioNr,
  storageId,
  placement,
  open,
  onClose,
  targetPage,
  successMessage,
  onConfirm,
  cartItem,
  dispComponent,
  defaultButtons
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm(cartItem)
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose(onClose);
      if (targetPage) {
        navigate(`${targetPage}`);
      }
    }, 1500);
  };
  //This function handles the case if we use a Mediumbutton instead of the two default buttons.
  const handleButtons = () => {
    if (defaultButtons === false) {
      return (
        <MediumButton text="Bekräfta" bgColor="#DEFFDF" onClick={handleConfirm} />
      )
    } else {
      return (
        <Box sx={{
          display: "flex",
          flexDirection: "row"
        }}>
          <SmallButton text="Ja" bgColor="#DEFFDF" onClick={handleConfirm} />
          <SmallButton text="Nej" bgColor="#FFD6D6" onClick={onClose} />
        </Box>
      )
    }
  }
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          width: "333px",
          minHeight: "191px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "34px",
          fontWeight: 400,
          textAlign: "center",
          margin: "10px auto 0px auto",
          wordBreak: "break-word",
          width: "263.54px",
        }}
      >
        Vill du koppla
      </Typography>
      <Box >
      <Typography sx={{
          fontSize: "22px",
          fontWeight: 400,
          margin: "2px auto 0px auto",
          wordBreak: "break-word",
          width: "263.54px",
        }}>{article}</Typography>
      <Typography sx={{
          fontSize: "20px",
          fontWeight: 150,
          margin: "2px auto 0px auto",
          wordBreak: "break-word",
          width: "263.54px",
        }}>{lioNr}</Typography>
        </Box>
        <Typography
        sx={{
          fontSize: "34px",
          fontWeight: 400,
          textAlign: "center",
          margin: "10px auto 0px auto",
          wordBreak: "break-word",
          width: "263.54px",
        }}
      >
        till lagerplats:
      </Typography>
      <Box >
      <Typography sx={{
          fontSize: "20px",
          fontWeight: 200,
          margin: "2px auto 0px auto",
          wordBreak: "break-word",
          width: "263.54px",
        }}>Lager {storageId} {'>'} {placement}</Typography>
      
        </Box>
      
      <Box
      

        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px auto 30px auto",
        }}>{dispComponent}
        {handleButtons()}
        <SuccessDialog message={successMessage} open={showSuccess} />
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;
