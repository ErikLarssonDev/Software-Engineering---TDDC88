import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

/**
 * 
 * @returns The CartIcon that is used in the NavBar and takes the user back to the CartPage onClick.
 */

const CartIcon = () => {
  return (
    <Link to="/checkout-cart">
      <ShoppingCartOutlinedIcon sx={{ fontSize: "60px", color: "black" }} />
    </Link>
  );
};

export default CartIcon;
