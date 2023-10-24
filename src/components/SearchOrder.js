import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import ReportIcon from "@mui/icons-material/Report";
import { fetchOrderId } from "../utils/orders";
import OrderCard from "./OrderCard";
import FilterOrders from "../components/FilterOrders"

/**
 *
 * @returns The search for order field where the user can search for an order using the id. This search field can be used for view S10.
 * @param {icon} param0, an icon that will be displayed at the right edge of the search field.
 * @param {storageId} param1, The id for the storage, ex. "A" in "Storage A".
 * @param {ordDate} param2, The date the order was done, ex. "1/11-22".
 * @param {levDate} param3, The date the order is to be delivered, ex. "2/11-22".
 * @param {id} param4, The orderid, ex "1111-2222".
 */

const SearchOrder = ({ icon }) => {
  const [orderId, setOrderId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState("");
  const [notValidId, setNotValidId] = useState(false);

  const queryDatabaseId = async (query) => {
    return await fetchOrderId(query);
  };
  const [open, setOpen] = useState(false);
  function handleClose(){
    setOpen (false);
  }
  function handleOpen(){
    setOpen(true);
  }

  /**
   * Handles the search when the user presses 'enter'. Fetches the searched order,
   * by id. If the searched order doesn't exist an
   * error message is shown.
   */
  const handleSearch = async () => {
    // Removes the previously searched orders.
    setOrderId("");
    handleOpen()
    if (searchedOrder) {
      // If the user searches by id number.
      if (!isNaN(searchedOrder)) {
        const queryRes = await queryDatabaseId(searchedOrder);
        if (queryRes.id === undefined) {
          setNotValidId(true);
        } else {
          setNotValidId(false);
          setOrderId(queryRes);
        }
      }
    }
    else {
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        sx={{ backgroundColor: "white", maxWidth: "334px", width: "100%" }}
        id="article-search"
        label="Sök efter beställning..."
        onChange={(e) => {
          setSearchedOrder(e.target.value);
        }}
        value={searchedOrder}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            handleSearch();
            ev.preventDefault();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>{icon}</IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* If the LIO number is invalid */}
      {notValidId && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "5px" }}>
          <Typography
            sx={{
              color: "red",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ReportIcon sx={{ mr: "5px" }} />
            Ogiltigt LIO-nummer
          </Typography>
        </Box>
      )}
      {/* Renders the searched order by id number */}
      {orderId !== "" && (
        <OrderCard
          id={orderId.id}
          storageId={orderId.storageId}
          levDate={orderId.levDate}
          ordDate={orderId.ordDate}
        />
      )}
      <FilterOrders open={open} close={handleClose} />
    </Box>
    
  );
};

export default SearchOrder;
