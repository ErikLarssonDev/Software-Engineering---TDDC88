import { Box } from "@mui/system";
import NavBar from "../components/NavBar";
import MenuIcon from "../assets/navBarIcons/MenuIcon";
import InstructionTextBox from "../components/InstructionTextBox";
import ModernQrScanner from "../components/ModernQrScanner";
import { useState } from "react";
import MoveArticlePage from "./MoveArticlePage";
import ConfirmDialog from "../components/ConfirmDialog";
import { useRecoilState, useRecoilValue } from "recoil";
import { storage as storageAtom } from "../recoil/atoms";
import { newStorage as newStorageAtom } from "../recoil/atoms";
import { connectArticle, fetchStorage, moveArticle, removeArticleFromStorage } from "../utils/storages";
import { Typography } from "@mui/material";
import SuccessDialog from "../components/SuccessDialog";
import { useNavigate } from "react-router-dom";
import { deleteCompartment, fetchCompartment } from "../utils/compartments";

/**
 *
 * @returns The scan new storage page (view 13.2.1) with confirm dialog (view 13.2.2 & 13.2.3).
 */

const ScanNewStoragePage = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const selectedStorage = useRecoilValue(storageAtom);
  const [selectedNewStorage, setSelectedNewStorage] = useRecoilState(newStorageAtom);
  const [moveNotPossible, setMoveNotPossible] = useState(false);
  const navigate = useNavigate();
  
  // Function for handling the scan of a storage.
  const handleScan = async (scannedData) => {
    if (scannedData) {
      const queryRes = await fetchCompartment(scannedData.data);
      if (queryRes.storageId !== undefined) {
  
        setSelectedNewStorage({ ...queryRes });

        setShowConfirmDialog(true);
      }
    }
  };

  // Function for moving the article to another storage
  const handleMoveArticle = () => {
    
    // If the new storage placement is available
    if (!selectedNewStorage.article?.name) {
      deleteCompartment(selectedStorage.qrCode);
      connectArticle(selectedNewStorage.qrCode, selectedStorage.article.lioNr, selectedStorage.quantity);

      moveArticle("",selectedStorage.qrCode, selectedNewStorage.qrCode, selectedStorage.quantity);
      // If the new storage placement is occupied
    } else {
      setMoveNotPossible(true);
      setTimeout(() => {
        setMoveNotPossible(false);
      }, 1500)
    }
  };

  return (
    <Box>
      {showConfirmDialog && (
        <>
          <MoveArticlePage />
          <ConfirmDialog
            open={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            targetPage="/manage-inventory"
            successMessage="Artikel Flyttad"
            defaultButtons={true}
            onConfirm={handleMoveArticle}
            dispComponent={
              <>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "24px",
                    wordBreak: "wrap",
                    padding: "10px 20px 10px 20px",
                  }}
                >
                  Flytta {selectedStorage.article.name} <br /> till <br /> Lager{" "}
                  {selectedNewStorage.storageId} {">"}{" "}
                  {selectedNewStorage.placement}
                </Typography>
              </>
            }
          />
          <SuccessDialog message='Lagerplats upptagen' open={moveNotPossible} failiure={true} />
        </>
      )}
      {!showConfirmDialog && (
        <>
          <NavBar leftIcon={<MenuIcon />} />
          <InstructionTextBox text="Scanna ny lagerplats" />
          <ModernQrScanner onScan={handleScan} />
        </>
      )}
    </Box>
  );
};

export default ScanNewStoragePage;
