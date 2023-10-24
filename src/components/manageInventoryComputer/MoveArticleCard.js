import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SmallButton from "../SmallButton";
import {
  fetchAllStorages,
  fetchStorage,
  updateStorageQuantity,
} from "../../utils/storages";
import { useEffect } from "react";
import { storage as storageAtom } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import SuccessDialog from "../SuccessDialog";

/**
 * @param {closeDetails} param0, A function for triggering the details to hide (from view M13.1 back to M13).
 * @returns The move between storages component (used in view M13.1)
 */
const MoveArticleCard = ({ closeDetails, displayStorages }) => {

  // Used to display the selected storage to move to in the drop-down.
  const [storageTo, setStorageTo] = useState("");
  // Used to check if the user has selected a storage to move to. 
  const [storageToSelected, setStorageToSelected] = useState(false);
  // Used to display the selected storage to move from in the drop-down.
  const [storageFrom, setStorageFrom] = useState("");
  // Used to check if the user has selected a storage to move from.
  const [storageFromSelected, setStorageFromSelected] = useState(false);
  // Used to store the input from the quantity field.
  const [quantity, setQuantity] = useState("");
  // Used to store and display all storages. 
  const [allStorages, setAllStorages] = useState();
  // Used to trigger an error modal if the user has not seleceted both 'from' and 'to'.
  const [storageNotSelected, setStorageNotSelected] = useState(false);
  // Used to trigger an error modal if the user has entered an invalid quantity to move.
  const [unallowedQuantity, setUnallowedQuantity] = useState(false);
  // Used to trigger a success modal after a move is completed. 
  const [moved, setMoved] = useState(false);
  // Used to keep track of what article/storage the user clicked on view M13.
  const selectedStorage = useRecoilValue(storageAtom);
  // Used to store the fetched data about the storage to move to. 
  const [selectedStorageTo, setSelectedStorageTo] = useState();
  // Used to store the fetched data about the storage to move from. 
  const [selectedStorageFrom, setSelectedStorageFrom] = useState();

  // Fetch all storages to display in the dropdown menu
  useEffect(() => {
    availableStorages();
  }, []);

  const availableStorages = async () => {
    const queryRes = await fetchAllStorages();
    setAllStorages(queryRes);
  };

  // When selecting the storage to move from
  const handleChangeFrom = async (event) => {
    setStorageFrom(event.target.value);
    setSelectedStorageFrom(await fetchStorage(event.target.value));
    setStorageFromSelected(true);
  };

  // When selecting the storage to move to
  const handleChangeTo = async (event) => {
    setStorageTo(event.target.value);
    setSelectedStorageTo(await fetchStorage(event.target.value));
    setStorageToSelected(true);
  };

  // When "flytta" is clicked
  const handleMove = () => {
    if (storageFromSelected && storageToSelected) {
      if (
        (parseInt(quantity) <= selectedStorageFrom.compartments?.quantity) &&
        (parseInt(quantity) > 0)
      ) {
        updateStorageQuantity(
          selectedStorageFrom.id,
          selectedStorageFrom,
          selectedStorageFrom.compartments?.quantity - parseInt(quantity)
        );
        updateStorageQuantity(
          selectedStorageTo.id,
          selectedStorageTo,
          selectedStorageTo.compartments?.quantity + parseInt(quantity)
        );
        setMoved(true);
        setTimeout(() => {
          displayStorages();
          setMoved(false);
          closeDetails();
        }, 1500);
      } else {
        setUnallowedQuantity(true);
        setTimeout(() => {
          setUnallowedQuantity(false);
        }, 1500);
      }
    } else {
      setStorageNotSelected(true);
      setTimeout(() => {
        setStorageNotSelected(false);
      }, 1500);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "298px",
        height: "100%",
        paddingBottom: "1.5rem",
        backgroundColor: "#FFF",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ margin: "18px 0 0 24px" }}>
        <Typography sx={{ fontSize: "24px" }}>Flytta mellan lager</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "20px",
          alignItems: "center",
          mt: "15px",
        }}
      >
        {/* 
          Selector for the storage to move from. 
          */}
        <Box
          sx={{
            maxWidth: "407px",
            width: "100%",
            borderRadius: "12px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Från lager</InputLabel>
            <Select
              value={storageFrom}
              label="Från lager"
              onChange={handleChangeFrom}
              sx={{
                borderRadius: "12px",
                border: "1px solid #D0D4D9",
              }}
            >
              {allStorages &&
                allStorages
                  .filter(
                    (e) =>
                      e.compartments?.article?.name ===
                      selectedStorage.compartments?.article?.name
                  )
                  .map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      <Box
                        key={item.id}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "19px", fontWeight: 700, mr: "15px" }}
                        >
                          {item.compartments?.storageId}
                        </Typography>
                        <Typography sx={{ fontSize: "19px" }}>
                          {item.compartments?.quantity} st
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Box>
        {/* 
          Selector for the storage to move to. 
          */}
        <Box
          sx={{
            maxWidth: "407px",
            width: "100%",
            borderRadius: "12px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Till lager</InputLabel>
            <Select
              value={storageTo}
              label="Från lager"
              onChange={handleChangeTo}
              sx={{
                borderRadius: "12px",
                border: "1px solid #D0D4D9",
              }}
            >
              {allStorages &&
                allStorages
                  .filter(
                    (e) =>
                      e.compartments?.article?.name ===
                      selectedStorage.compartments?.article?.name
                  )
                  .map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      <Box
                        key={item.id}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "19px", fontWeight: 700, mr: "15px" }}
                        >
                          {item.compartments?.storageId}
                        </Typography>
                        <Typography sx={{ fontSize: "19px" }}>
                          {item.compartments?.quantity} st
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            gap: "90px",
          }}
        >
          {/* 
          Input field for the quantity to move.
          */}
          <Box
            sx={{
              maxWidth: "180px",
              width: "100%",
              borderRadius: "12px",
            }}
          >
            <TextField
              variant="outlined"
              type="name"
              label="Antal"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{
                "& fieldset": {
                  borderRadius: "12px",
                },
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "12px",
              }}
            />
          </Box>
          <SmallButton
            text="Flytta"
            bgColor="rgba(48, 235, 123, 0.15)"
            onClick={handleMove}
          />
        </Box>
      </Box>
      <SuccessDialog 
        message="Artikel flyttad" 
        open={moved}
      />
      <SuccessDialog
        message="Välj lagerplats"
        open={storageNotSelected}
        failiure={true}
      />
      <SuccessDialog
        message="Otillåtet antal"
        open={unallowedQuantity}
        failiure={true}
      />
    </Box>
  );
};

export default MoveArticleCard;
