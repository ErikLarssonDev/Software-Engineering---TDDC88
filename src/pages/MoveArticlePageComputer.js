import React from "react";
import { Box } from "@mui/material";
import NavBarComputer from "../components/NavBarComputer";
import ManageArticleCard from "../components/manageInventoryComputer/ManageArticleCard";
import ManageArticleList from "../components/manageInventoryComputer/ManageArticleList";
import MoveArticleCard from "../components/manageInventoryComputer/MoveArticleCard";
import ChosenArticleCard from "../components/manageInventoryComputer/ChosenArticleCard";
import { useState } from "react";
import { fetchAllStorages, fetchStorage, removeArticleFromStorage } from "../utils/storages";
import { useRecoilState } from "recoil";
import { storage as storageAtom } from "../recoil/atoms";
import SuccessDialog from "../components/SuccessDialog";

/**
 *
 * @returns The move article page for the computer version (view M13).
 */

const MoveArticlePageComputer = () => {

  const [showDetails, setShowDetails] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);
  const [storage, setStorage] = useRecoilState(storageAtom);
  const [storages, setStorages] = useState();

  // When an item in the list is clicked
  const handleItemClick = (event, param) => {
    fetchClickedArticle(param);
    setShowAdjust(false);
    setShowDetails(true);
  };

  const fetchClickedArticle = async (param) => {
    const queryRes = await fetchStorage(param);
    if (queryRes.id !== undefined) {
      setStorage({ ...queryRes });
    }
  };

  // When "justera lagersaldo" is clicked
  const handleAdjust = () => {
    setShowDetails(false);
    setShowAdjust(true);
  };

  // When "Godkänn" is clicked
  const handleAdjustClose = () => {
    setShowAdjust(false);
  };

  // When "ta bort vara från plats" is clicked
  const handleRemove = () => {
    removeArticleFromStorage(storage.id, storage);
    setShowRemoved(true);
    setTimeout(() => {
      displayStorages();
      setShowDetails(false);
      setShowRemoved(false);
    }, 1500);
  };

  // When "flytta" is clicked
  const closeDetails = () => {
    displayStorages();
    setShowDetails(false);
  }

  const displayStorages = async () => {
    const queryRes = await fetchAllStorages();
    setStorages(queryRes);
  }

  return (
    <Box sx={{ paddingBottom: "3rem" }}>
      <NavBarComputer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "56px",
          maxWidth: "1137px",
          width: "100%",
          margin: "auto",
          mt: "20px",
        }}
      >
        <ManageArticleList
          handleItemClick={handleItemClick}
          displayStorages={displayStorages}
          storages={storages}
        />
        <Box
          sx={{
            maxWidth: "542px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {showDetails && (
            <>
              <ManageArticleCard
                currentStorage={storage}
                handleAdjust={handleAdjust}
                handleRemove={handleRemove}
                closeDetails={closeDetails}
              />
              <MoveArticleCard
                closeDetails={closeDetails}
                displayStorages={displayStorages}
              />
            </>
          )}
          {showAdjust && (
            <ChosenArticleCard
              handleAdjustClose={handleAdjustClose}
              displayStorages={displayStorages}
            />
          )}
        </Box>
        <SuccessDialog message="Artikel borttagen" open={showRemoved} />
      </Box>
    </Box>
  );
};

export default MoveArticlePageComputer;
