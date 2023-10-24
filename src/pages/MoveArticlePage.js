import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {storage as storageAtom } from '../recoil/atoms';
import NavBar from "../components/NavBar";
import MenuIcon from "../assets/navBarIcons/MenuIcon";
import InstructionTextBox from "../components/InstructionTextBox";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MediumButton from "../components/MediumButton";
import { selected as selectedAtom } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import { removeArticleFromStorage } from "../utils/storages";



/**
 *
 * @returns The move article page (view 13.2) with confirm modal on button click (view 13.2.4), and removal of article from storage (view 13.2.5).
 */

const MoveArticlePage = () => {
  const selectedStorage = useRecoilValue(storageAtom);
  const selectedArticle = useRecoilValue(selectedAtom)
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    setShowDialog(true);
  }
  const handleConfirm = () => {
    removeArticleFromStorage(selectedStorage.qrCode, selectedStorage);
  }

  return (
    <Box>
      <NavBar leftIcon={<MenuIcon />} />
      <InstructionTextBox text="Hantera lager" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "350px",
          margin: "auto",
          mt: "26px",
          padding: "0 0.5rem 0 0.5rem",
        }}
      >
        <Card
          sx={{
            minHeight: "537px",
            borderRadius: "12px",
            padding: "0 12px 0 12px",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
              Vald artikel
            </Typography>
            <Typography sx={{ fontSize: "24px", mt: "10px" }}>
              {selectedStorage?.article?.name}
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
              LIO-nummer: {selectedStorage?.article?.lioNr}
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
              Antal: {selectedStorage?.quantity}{" "}
              {selectedArticle?.quantity === 1 ? "kartong" : "kartonger"}
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 300,
                fontStyle: "italic",
                mt: "5px",
              }}
            >
              Nästa leverans: {selectedArticle.levDate}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", fontWeight: 300, fontStyle: "italic" }}
            >
              Antal: {selectedArticle.levBalance}{" "}
              {selectedArticle.levBalance === 1 ? "kartong" : "kartonger"}
            </Typography>
            <Typography sx={{ fontSize: "24px", mt: "20px" }}>
              Nuvarande lagerplats
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
              Lager {selectedStorage.storageId} &gt; {selectedStorage.placement}
            </Typography>
            <Typography sx={{ fontSize: "24px", mt: "20px" }}>
              Scanna ny lagerplats
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
              <Link to="/scan-new-storage" style={{ color: "inherit" }}>
                <QrCodeScannerIcon
                  sx={{ height: "137.68px", width: "134.56px" }}
                />
              </Link>
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
          <MediumButton onClick={handleClick} text="Ta bort vara från plats" bgColor="#FFE2E2" />
        </Box>
        <ConfirmDialog 
          open={showDialog}
          onClose={() => setShowDialog(false)}
          targetPage="/manage-inventory"
          successMessage="Artikel borttagen"
          onConfirm={handleConfirm}
          dispComponent={
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '25px 15px 25px 15px' }} >
              <Typography sx={{ fontSize: '24px', textAlign: 'center', wordBreak: 'break-word' }} >
                Ta bort {selectedStorage?.article?.name} från Lager {selectedStorage?.storageId} &gt; {selectedStorage?.placement}
              </Typography>
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

export default MoveArticlePage;
