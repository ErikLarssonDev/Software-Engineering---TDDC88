import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import SmallButton from "../components/SmallButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import MinusButton from "../components/MinusButton";
import AddButton from "../components/AddButton";
import ConfirmDialog from "../components/ConfirmDialog";
import { useRecoilState } from "recoil";
import { cart as cartAtom } from "../recoil/atoms";
import { remaining } from "../utils/cart";

/**
 * @param {productName} param0 The name of the product placed in the cart.
 * @param {lioNum} param1 The LIO number of the selected product.
 * @param {amount} param2
 * @returns The cards for Checkout Cart (View 9).
 */

const CartCard = ({ cartItem, onConfirm }) => {
  //Instead of importing the atom, we should send the cartState and then just cart.amout + 1...
  const [cart, setCart] = useRecoilState(cartAtom);
  const [count, setCount] = useState(cartItem.amount);

  const Increment = () => {
    if (0 < remaining(cartItem)) {
      const newCart = cart.map((item) => {
        if (item.lioNr === cartItem.lioNr) {
          return {
            ...item,
            amount: item.amount + 1
          }; 
        }
        return item;
      });
      setCart(newCart);
    } else {
      return
    }
  };
  /*
        This function decrements and decrements the counter for the amount of Boxes added
      */
  const Decrement = () => {
    if (cartItem.amount > 0) {
      const newCart = cart.map((item) => {
        if (item.lioNr === cartItem.lioNr) {
          return {
            ...item,
            amount: item.amount - 1
          };
        }
        return item;
      });
      setCart(newCart);
    } else {
      setCount(0);
    }
  };

  
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    setShowDialog(true);
  };

  return (
    <Box
      marginTop={2}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Card
        sx={{
          borderRadius: "12px",
          minWidth: 350,
          border: 1,
          borderColor: "#D0D4D9",
          boxShadow: 4,
        }}
      >
        <CardContent
          sx={{
            px: 1,
          }}
        >
          <Box sx={{}} display={"flex"} alignItems={"right"} mb={2}>
            <Box display={"flex"} flexDirection={"column"} mr={-1}>
              <Typography
                sx={{
                  mt: 2,
                  fontSize: 24,
                  fontFamily: "Montserrat",
                }}
              > 
                {cartItem.hasOwnProperty("name") ? cartItem.name : cartItem.article.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                }}
                variant="body2"
              >
                LIO-nummer: {cartItem.hasOwnProperty("lioNr") ? cartItem.lioNr : cartItem.article.lioNr}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"right"} ml={2} mt={2}>
              <CardActions
                sx={{
                  justifyContent: "right",
                }}
              >
                <MinusButton onClick={Decrement}></MinusButton>
                <Typography
                  sx={{
                    font: "Montserrat",
                    fontSize: "25px",
                    textalign: "center",
                    lineHeight: "30px",
                    ml: 0,
                    mr: -1.2,
                    fontWeight: 900,
                  }}
                  variant="body2"
                >
                  {cart.map((item) => {
                    if (item.lioNr === cartItem.lioNr) return item.amount;
                  })}
                </Typography>
                <AddButton onClick={Increment}></AddButton>
              </CardActions>
            </Box>
          </Box>
          <CardActions
            sx={{
              justifyContent: "center",
              mb: -2,
            }}
          >
            <SmallButton
              text="Ta bort artikel"
              bgColor="rgba(63, 142, 252, 0.15)"
              onClick={handleClick}
            />
            <ConfirmDialog
              message="Bekräfta borttagning?"
              open={showDialog}
              onClose={() => {
                setShowDialog(false);
              }}
              onConfirm={onConfirm}
              cartItem={cartItem}
              successMessage="Artikel borttagen"
            />
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CartCard;
