import * as React from "react";
import NavBar from "../components/NavBar";
import PlusIcon from "../assets/navBarIcons/RoundedAddIcon";
import MenuIcon from "../assets/navBarIcons/MenuIcon";
import OrderCard from "../components/OrderCard";
import { Box, Typography, Button } from "@mui/material";
import SearchBarTuneIcon from "../assets/searchBarIcons/SearchBarTuneIcon";
import SearchOrder from "../components/SearchOrder"
import { useRecoilValue } from "recoil";
import { orders as ordersAtom } from "../recoil/atoms";
import AddOrder from "../components/AddOrder";

/**
 * @param {orders} param0, all of the orders in a atom, set in HomePage.
 * @returns The order page.
 */

const OrderPage = () => {

  const [anchorNewOrder, setOpenNewOrder] = React.useState(null);
  const openNewOrder = Boolean(anchorNewOrder);

  function handleAddOrderDialog(event) {
    setOpenNewOrder(event.currentTarget);
  };
  function handleClose() {
    setOpenNewOrder(null);
  };

  const orders = useRecoilValue(ordersAtom);
  return (
    <Box>
      <NavBar
        leftIcon={<MenuIcon />}
        rightIcon={
          <Button onClick={handleAddOrderDialog}>
            <PlusIcon />
          </Button>
        }
      />
      <Typography
        sx={{
          fontSize: "32px",
          textAlign: "center",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "39px",
          mb: 2,
        }}
      >
        Beställningar
      </Typography>
      <SearchOrder icon={<SearchBarTuneIcon />} text="Sök efter beställning" />
      {/* Mapping the array orders and creating a card for each order */}
      {orders.map(order => {
        return <OrderCard key={order.id} order={order} />
      })}
      <AddOrder open={openNewOrder} close={handleClose} anchor={anchorNewOrder}></AddOrder>
    </Box>
  );
};

export default OrderPage;