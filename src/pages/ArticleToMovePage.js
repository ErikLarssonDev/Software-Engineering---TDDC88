import React from "react";
import Box from "@mui/material/Box";
import NavBar from "../components/NavBar";
import MenuIcon from "../assets/navBarIcons/MenuIcon";
import InstructionTextBox from "../components/InstructionTextBox";
import { Card, CardContent, Typography, Button } from "@mui/material";
import MediumButton from "../components/MediumButton";
import SuccessDialog from "../components/SuccessDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selected as selectedAtom, storage as storageAtom } from "../recoil/atoms";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { updateStorageQuantity } from "../utils/storages";
import { changeQuantity } from "../utils/compartments";

/**
 *
 * @returns The article to move page (view M2 and M2.1)
 */

const ArticleToMovePage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); 
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const selected = useRecoilValue(selectedAtom);
  const selectedStorage = useRecoilValue(storageAtom);

  const increment = () => {
    if (count >= selected.quantity) {
      return
    } else {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      return
    }
  };

  // When the "Flytta" button is clicked.
  const handleMove = () => {
    var filteredCompartments = selectedStorage.compartments.filter((c) => {
      if (c.article) {
      return (c.article.lioNr.localeCompare(selected.lioNr) == 0) ;    
      }              
    });
    // If the article in the selected storage is the same as the scanned article, i.e. if the requested move is possible.
    if (filteredCompartments) {
      // Increase quantity in the "new" storage
      updateStorageQuantity(
        filteredCompartments[0].qrCode,
        filteredCompartments[0].placement,
        filteredCompartments[0].storageId,
        parseInt(filteredCompartments[0].quantity) + parseInt(count),
        filteredCompartments[0].normalOrderQuantity,
        filteredCompartments[0].orderQuantityLevel
      );

      var newQuantity = selected.compartments.quantity - count;

      /*var filteredArticles = selected.compartments.filter((c) => {
        return (c.qrCode.localeCompare(filteredCompartments[0].qrCode) == 0) ;                  
      });*/

      


      if (selected) {
      // Decrease quantity in the "old" storage
      changeQuantity("", selected.compartments.qrCode, selected.compartments.storageId, parseInt(newQuantity), "adjust");
      } else {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          navigate("/new-storage");
        }, 2000);

      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/new-storage");
      }, 1500);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        navigate("/new-storage");
      }, 2000);
    }
  };

  // When the "Avbryt" button is clicked.
  const handleCancel = () => {
    navigate("/new-storage");
  };

  return (
    <Box>
      <NavBar leftIcon={<MenuIcon />} />
      <InstructionTextBox text="Artikel för flytt" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minWidth: "310px",
          mt: "26px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            borderRadius: "12px",
            paddingBottom: "10px",
            width: "90%",
            minWidth: "310px",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
              Skannad artikel
            </Typography>
            <Box sx={{ ml: "15px" }}>
              <Typography sx={{ fontSize: "24px", mt: "10px" }}>
                {selected.name}
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                LIO-nummer: {selected.lioNr}
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                Lager {selected.compartments.storageId} &gt; {selected.compartments.placement}
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                Flyttas till:
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                Lager {selectedStorage.compartments[0].storageId} &gt;{" "}
                {selectedStorage.compartments[0].placement}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            borderRadius: "12px",
            width: "90%",
            minWidth: "310px",
            marginTop: "26px",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
              Antal för flytt:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                mt: "10px",
              }}
            >
              <Button
                sx={{
                  width: "20px",
                  color: "#000",
                  backgroundColor: "#FFF",
                  borderColor: "#D0D4D9",
                  border: 1,
                  borderRadius: "6px",
                  mr: "20px",
                }}
                onClick={decrement}
              >
                <RemoveIcon />
              </Button>
              <Typography sx={{ fontSize: "28px", fontWeight: 800 }}>
                {count}
              </Typography>
              <Button
                sx={{
                  width: "20px",
                  color: "#000",
                  backgroundColor: "#FFF",
                  borderColor: "#D0D4D9",
                  border: 1,
                  borderRadius: "6px",
                  ml: "20px",
                }}
                onClick={increment}
              >
                <AddIcon />
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            borderRadius: "12px",
            margin: "26px 0 26px 0",
            width: "90%",
            minWidth: "310px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardContent>
            <MediumButton
              text="Flytta"
              bgColor="#D8FCE8"
              onClick={() => setShowConfirm(true)}
            />
            <MediumButton
              text="Avbryt"
              bgColor="#FC3F3F26"
              onClick={handleCancel}
            />
          </CardContent>
        </Card>
      </Box>
      <SuccessDialog message="Artikel Flyttad" open={showSuccess} />
      <SuccessDialog
        message="Artikel har ej plats i nytt lager"
        open={showError}
        failiure={true}
      />
      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleMove}
        dispComponent={
          <Typography
            sx={{ fontSize: "24px", textAlign: "center", padding: "1.5rem" }}
          >
            Flytta {count} {count > 1 ? "lådor" : "låda"} {selected.name} till
            Lager {selectedStorage.compartments[0].storageId} &gt;{" "}
            {selectedStorage.compartments[0].placement}?
          </Typography>
        }
      />
    </Box>
  );
};

export default ArticleToMovePage;
