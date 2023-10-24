import React from "react";
import { Box, Card, CardContent, Typography, TextField } from "@mui/material";
import MediumButton from "../components/MediumButton";
import SuccessDialog from "../components/SuccessDialog";
import NavBar from "../components/NavBar";
import { useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../assets/navBarIcons/HomeIcon";
import { changeQuantity } from "../utils/compartments";
import { useRecoilState, useRecoilValue } from "recoil";
import { cart as cartAtom,  selected as selectedAtom, selectedSearch, selectedSearch as selectedSearchAtom, search as searchAtom, selectedCompartment as selectedCompartmentAtom} from '../recoil/atoms'
import { SignalCellularConnectedNoInternet0BarSharp } from "@mui/icons-material";

/**
 *
 * @param {product} param0 The product selected to adjust.
 * @param {lioNum} param1 The LIO number of the selected product.
 * @param {storage} param2 The storage room where the selected product can be found.
 * @param {shelf} param3 The shelf in the storage room where the selected product can be found.
 * @param {compartment} param4 The compartment on the shelf where the selected product can be found.
 * @param {deliveryDate} param5 The date for the next delivery of the selected product.
 * @param {deliveryAmount} param6 The amount of items that will arrive with the next delivery.
 * @param {balance} param7 The current inventory balance of the selected product.
 * @returns The adjust inventory page (view 5).
 */
const AdjustInventory = ({
  product,
  lioNum,
  storage,
  shelf,
  compartment,
  deliveryDate,
  deliveryAmount,
  balance,
}) => {
  const selected = useRecoilValue(selectedAtom);
  const selectedSearch = useRecoilValue(selectedSearchAtom)
  const selectedCompartment = useRecoilValue(selectedCompartmentAtom)
  const search = useRecoilValue(searchAtom)
  const [open, setOpen] = useState(false);
  const [newQuantity, setNewQuantity] = useState(selected.quantity)
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSuccessDialog = () => {
    if (newQuantity >= 0) {
      if(search) {
        changeQuantity("",selectedCompartment.qrCode,selectedCompartment.storageId, parseInt(newQuantity),"adjust")
        setOpen(true);
      } else {
        changeQuantity("",selected.qrCode,selected.storageId, parseInt(newQuantity),"adjust")
        setOpen(true);
       
        setOpen(true);
      }
    
    
  
    setTimeout(() => {
      setOpen(false);
      navigate("/home-inventory");
      setError(false)
    }, 1000)} else {
      setError(true)
    };
  };

  return (
    <>
    <Box>
      <NavBar leftIcon={<HomeIcon/>} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "350px",
          margin: "auto",
          
        }}
      >
        <Card
          sx={{
            width: "350px",
            height: "537px",
            mt: "90px",
            borderRadius: "12px",
            border: "1px solid #D0D4D9",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
              {search ? selectedSearch.name : selected.article.name}
            </Typography>
            <Box sx={{ ml: "15px" }}>
              <Typography
                sx={{
                  mt: "15px",
                  mb: "4px",
                  fontSize: "24px",
                  fontWeight: 400,
                  wordBreak: "break-word",
                }}
              >
                {product}
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                LIO-nummer: {search ? selectedSearch.lioNr : selected.article.lioNr}
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                Lager {search ? selectedCompartment.storageId : selected.storageId} &gt; {search ? selectedCompartment.placement : selected.placement}
              </Typography>
              <Typography
                sx={{
                  mt: "4px",
                  fontStyle: "italic",
                  fontSize: "15px",
                  fontWeight: 300,
                }}
              >
                Nästa leverans: {deliveryDate}
              </Typography>
              <Typography
                sx={{ fontStyle: "italic", fontSize: "15px", fontWeight: 300 }}
              >
                Antal: {deliveryAmount} {deliveryAmount ? (search ? selectedSearch.inputUnit : selected.article.inputUnit) : ""}
              </Typography>
              <Typography
                sx={{ mt: "16px", fontSize: "24px", fontWeight: 400 }}
              >
                Nuvarande lagersaldo
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                Antal: {selectedCompartment.quantity} {search ? selectedSearch.outputUnit : selected.article.outputUnit}
              </Typography>
              <Typography
                sx={{ mt: "16px", fontSize: "24px", fontWeight: 400 }}
              >
                Nytt lagersaldo
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mb: "5px",
                  mt: "5px",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                  Antal:
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  type='number'
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  inputProps={{
                    style: {
                      height: "12px",
                      fontSize: "16px",
                      width: "45px",
                      backgroundColor: "rgba(217, 217, 217, 0.47)",
                    },
                  }}
                  sx={{
                    ml: "10px",
                  }}
                />
        
              </Box>
              {error && (
                
                <Typography 
                sx = {{ color:'red' }}>
                Felaktig inmatning <ReportIcon /></Typography>
                
                
                )} 
            </Box>
            <Box sx={{
                    mt: "50px",
                  }}>
            <MediumButton
              text="Godkänn"
              bgColor="rgba(48, 235, 123, 0.15)"
              onClick={handleSuccessDialog}
            />
            </Box>
            {/* The success dialog pop-up which appears after clicking "Godkänn" */}
            <SuccessDialog message="Lagersaldo uppdaterat" open={open} />
          </CardContent>
        </Card>
      </Box>
    </Box>



    </>
  );
};

export default AdjustInventory;
