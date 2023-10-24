import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ExtraSmallButton from "../ExtraSmallButton";
import SmallButton from "../SmallButton";
import { useState } from "react";
import {
  fetchAllStorages,
  fetchStorage,
  moveArticle,
  removeArticleFromStorage,
} from "../../utils/storages";
import SuccessDialog from "../SuccessDialog";
import { useEffect } from "react";
import { newStorage as newStorageAtom } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

/**
 * @param {currentStorage} param0, The storage the user clicked in the list (view M13).
 * @param {handleAdjust} param1, A function for triggering ChosenArticleCard (view M13.3) to show.
 * @param {handleRemove} param2, A function for handling the removal of an article ("Ta bort vara från plats").
 * @param {closeDetails} param3, A function for triggering the details to hide (from view M13.1 back to M13).
 * @returns The manage article card component (used in view M13.1)
 */
const ManageArticleCard = ({ currentStorage, handleAdjust, handleRemove, closeDetails }) => {

  // Used to set the new storage to move to. 
  const [selectedNewStorage, setSelectedNewStorage] = useRecoilState(newStorageAtom);
  // Used to display the clicked storage in the drop-down.
  const [chosenStorage, setChosenStorage] = useState("");
  // Used to trigger an error modal if the move is invalid.
  const [moveNotPossible, setMoveNotPossible] = useState(false);
  // Used to trigger an error modal if the user has not chosen a storage to move to. 
  const [storageNotChosen, setStorageNotChosen] = useState(false);
  // Used to store and display all storages.
  const [allStorages, setAllStorages] = useState();
  // Used to check if a storage has been selected. 
  const [storageSelected, setStorageSelected] = useState(false);
  // Used to trigger a success modal after a move is completed.
  const [moved, setMoved] = useState(false);

  // Fetch all storages to display in the dropdown menu
  useEffect(() => {
    availableStorages();
  }, []);

  const availableStorages = async () => {
    const queryRes = await fetchAllStorages();
    setAllStorages(queryRes);
  };

  // Set the clicked storage in the dropdown menu as the selected storage
  const handleChange = async (event) => {
    setSelectedNewStorage(await fetchStorage(event.target.value));
    setChosenStorage(event.target.value);
    setStorageSelected(true);
  };

  // When "flytta" is clicked
  const handleMove = () => {
    if (storageSelected) {
      if (selectedNewStorage.compartments?.article?.name === "") {
        moveArticle(selectedNewStorage.id, currentStorage, selectedNewStorage);
        removeArticleFromStorage(currentStorage.id, currentStorage);
        setMoved(true);
        setTimeout(() => {
          setMoved(false);
          closeDetails();
        }, 1500)
      } else {
        setMoveNotPossible(true);
        setTimeout(() => {
          setMoveNotPossible(false);
        }, 1500);
      }
    } else {
      setStorageNotChosen(true);
      setTimeout(() => {
        setStorageNotChosen(false);
      }, 1500);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "243px",
        height: "100%",
        paddingBottom: "1.5rem",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "row",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        backgroundColor: "#FFF",
      }}
    >
      <Box sx={{ margin: "18px 0 0 24px" }}>
        <Typography sx={{ fontSize: "24px" }}>
          {currentStorage.compartments?.article?.name}
        </Typography>
        <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
          LIO-nummer: {currentStorage.compartments?.article?.lioNr}
        </Typography>
        <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
          Lager {currentStorage.compartments?.storageId} &gt;{" "}
          {currentStorage.compartments?.placement}
        </Typography>
        <Box
          sx={{
            minWidth: "171px",
            borderRadius: "12px",
            mt: "55px",
            ml: "70px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Ny plats</InputLabel>
            <Select
              value={chosenStorage}
              label="Ny plats"
              onChange={handleChange}
              sx={{
                borderRadius: "12px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                border: "1px solid #D0D4D9",
              }}
            >
              {allStorages &&
                allStorages.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.compartments?.placement}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: "41px 0 0 30px",
        }}
      >
        <ExtraSmallButton
          text="Ta bort vara från plats"
          bgColor="rgba(252, 63, 63, 0.15)"
          onClick={handleRemove}
        />
        <ExtraSmallButton
          text="Justera lagersaldo"
          bgColor="#CFE7FE"
          onClick={handleAdjust}
        />
        <Box sx={{ mt: "10px" }}>
          <SmallButton
            text="Flytta"
            bgColor="rgba(48, 235, 123, 0.15)"
            onClick={handleMove}
          />
        </Box>
      </Box>
      <SuccessDialog
        message="Lagerplats upptagen"
        open={moveNotPossible}
        failiure={true}
      />
      <SuccessDialog
        message="Välj lagerplats"
        open={storageNotChosen}
        failiure={true}
      />
      <SuccessDialog 
        message="Artikel flyttad"
        open={moved}
      />
    </Box>
  );
};

export default ManageArticleCard;
