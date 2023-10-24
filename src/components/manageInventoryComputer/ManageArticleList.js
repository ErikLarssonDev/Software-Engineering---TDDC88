import React from "react";
import { Box, Divider } from "@mui/material";
import ManageArticleListItem from "./ManageArticleListItem";
import { useEffect } from "react";
import { fetchAllStorages } from "../../utils/storages";
import { useState } from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

/**
 * @param {handleItemClick} param0, A function for handling clicks on a list item.
 * @returns The manage article list (used in all M13 views)
 */
const ManageArticleList = ({ handleItemClick, displayStorages, storages }) => {
  //const [storages, setStorages] = useState();

  useEffect(() => {
    displayStorages();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "542px",
        width: "100%",
        height: "100%",
        backgroundColor: "#FFF",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "12px",
      }}
    >
      {/* 
      TODO: Once the functionality is in place, only map 
      the appropriate articles depending on what storage 
      the user is currently in.
      Determined by the drop-down selector in the top-left.
      */}
      <MenuList>
        {storages &&
          storages.map((item) => (
            <Box key={item.id}>
              <MenuItem
                key={item.id}
                onClick={(event) => handleItemClick(event, item.id)}
              >
                <ManageArticleListItem
                  key={item.id}
                  name={item.compartments?.article?.name}
                  placement={item.compartments?.placement}
                  quantity={item.compartments?.quantity}
                />
              </MenuItem>
              <Divider />
            </Box>
          ))}
      </MenuList>
    </Box>
  );
};

export default ManageArticleList;
