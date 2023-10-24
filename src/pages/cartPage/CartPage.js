import * as React from "react";
import NavBar from "../../components/NavBar";
import { Box, Typography } from "@mui/material";
import CartCard from "../../components/CartCard";
import SuccessDialog from "../../components/SuccessDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MediumButton from "../../components/MediumButton";
import HomeIcon from "../../assets/navBarIcons/HomeIcon";
import QrIcon from "../../assets/navBarIcons/QrIcon";
import { cart as cartAtom } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { changeQuantity } from "../../utils/compartments";
import { remaining } from "../../utils/cart";
import { selected as selectedAtom , selectedSearch as selectedSearchAtom} from '../../recoil/atoms';
import { useRecoilValue } from "recoil";

/**
 * @param {products} param0 The products placed in the cart.
 * @param {numOfProducts} param1 The number of products placed in the cart.
 * @param {productName} param2 The name of a product in a card.
 * @param {lioNum} param3 The lio number of a product in a card.
 * @returns The CartPage component (view 9).
 */

const CartPage = ({ products, numOfProducts, productName, lioNum }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [selectedSearch, setSelectedSearch] = useRecoilState(selectedSearchAtom);
  
  const navigate = useNavigate();

  const [cart, setCart] = useRecoilState(cartAtom);

  const removeFromCart = (article) => {
    const newCart = cart.filter((item) => item.lioNr !== article.lioNr);
    setCart(newCart);
  };

  const handleDialog = () => { /**TODO: Edit function to handle transaction and error of response. We dont have to check that quantity is big enough. */ 
    cart.map((item) => {
        changeQuantity("", item.qrCode, item.storageId, item.amount, "takeout")
      return item
    })
    setCart([]);
    setSelected({});
    setSelectedSearch({});

    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
      if (sessionStorage.getItem("role") == 1) {
        navigate("/home");
      } else {
        navigate("/home-inventory");
      }
      
    }, 1000);
  };




  return (
    <Box>
      <NavBar leftIcon={<HomeIcon />} rightIcon={<QrIcon />} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "350px",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <Box>
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
            Valda artiklar
          </Typography>
          <Typography sx={{ fontSize: "16px", textAlign: "left", ml: 1 }}>
            {cart.length} produkter
          </Typography>
          <hr
            style={{
              color: "black",
              marginTop: "-2px",
            }}
          />

          {cart.map(cartItem => {
            return <CartCard key={cartItem.lioNr} cartItem={cartItem} onConfirm={removeFromCart} />
          })}


        </Box>
        <MediumButton
          text="Checka ut"
          bgColor="rgba(255, 255, 255)"
          //boxShadow="4"
          onClick={handleDialog}
        />
        <SuccessDialog message="Artiklar utmatade" open={showDialog} />
      </Box>
    </Box>
  );
};

export default CartPage;
