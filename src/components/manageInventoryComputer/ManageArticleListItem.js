import React from "react";
import { WarningRounded, Check, Clear } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";

/**
 *
 * @param {*} param0 The list item component for managing articles (used in ManageArticleList)
 * @returns
 */
const ManageArticleListItem = ({ name, placement, quantity }) => {

  let quantityIcon;

  if (quantity === 0) {
    quantityIcon = <Clear sx={{ color: 'red', fontSize: '29px' }} />
    // This might not be the right quantity to issue a warning symbol
  } else if (quantity < 30) {
    quantityIcon = <WarningRounded sx={{ color: '#FFB266', fontSize: '29px' }} />
  } else {
    quantityIcon = <Check sx={{ color: 'lightgreen', fontSize: '29px' }} />
  }

  return (
    <>
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: '5fr 5fr 4fr 1fr', 
          margin: '0 0px 0 0px', 
          alignItems: 'center',
        }}
        >
        <Typography sx={{ fontSize: "19px", textAlign: 'left' }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: "19px", textAlign: 'center' }}>
          {placement}
        </Typography>
        <Typography sx={{ fontSize: "19px", textAlign: 'right'}}>
          {quantity} st
        </Typography>
        <Box sx={{ ml: '10px', display: 'flex', alignItems: 'center' }} >
          {quantityIcon}
        </Box>
      </Box>
    </>
  );
};

export default ManageArticleListItem;
