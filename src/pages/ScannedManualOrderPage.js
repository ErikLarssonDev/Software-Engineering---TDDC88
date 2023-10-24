import * as React from "react";
import Box from "@mui/material/Box";
import NavBar from '../components/NavBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ProductSpecificationCard from '../components/ProductSpecificationCard';
import ProductSpecificationButton from '../components/ProductSpecificationButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import SuccessDialog from '../components/SuccessDialog';
import { orderItem } from "../utils/articles";
import MenuIcon from "../assets/navBarIcons/MenuIcon";
import ManualOrderCard from "../components/ManualOrderCard";
import { useRecoilValue } from "recoil";
import { selectedSearch as selectedSearchAtom, selectedCompartment as selectedCompartmentAtom } from '../recoil/atoms';

/**
 * 
 * @returns This implements view S11.2, S11.2.1, S11.2.2 so that the customer can view the chosen article and do manual orders
 */

const ScannedManualOrder = () => {
  // All states except recoil (global)
  const [openOrderConf, setOpenOrderConf] = useState(false);
  const [count, setCount] = useState(0);
  const selectedSearch = useRecoilValue(selectedSearchAtom)
  const selectedCompartment = useRecoilValue(selectedCompartmentAtom);
  const navigate = useNavigate();

  const orderArticle = () => {
    orderItem(selectedCompartment.storageId, [{ lioNr: selectedSearch.lioNr, quantity: selectedSearch.amount, unit: "input" }]) // TODO Get the correct storage ID.
  };


  return (
    <>
      <Box>
        <NavBar leftIcon={<MenuIcon />} />

        <ManualOrderCard />
        <Box display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}>
          <ProductSpecificationCard sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            count={count} setCount={setCount} text='Antal: ' />
        </Box>


        <Box
          marginTop={5}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          paddingBottom={5}
        >
          <Card
            sx={{
              borderRadius: "12px",
              maxWidth: 360,
              border: 1,
              borderColor: "#D0D4D9",
              boxShadow: 4,
            }}
          >
            <CardContent
              sx={{ fontSize: 40 }}
              style={{ color: "black" }}
              align="center"
            >
              <ProductSpecificationButton
                bgColor={"#D8FCE8"}
                text={"Lägg beställning"}
                onClick={() => setOpenOrderConf(true)}
              ></ProductSpecificationButton>
              <ProductSpecificationButton
                bgColor={"#FC3F3F26"}
                text={"Avbryt beställning"}
                onClick={() => navigate(`${"/manual-order"}`)}
              ></ProductSpecificationButton>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <SuccessDialog message={"Artikeln Tillagd"} />
      <ConfirmDialog
        message="Bekräfta beställning"
        open={openOrderConf}
        onClose={() => setOpenOrderConf(false)}
        onConfirm={orderArticle}
        targetPage="/manual-order"
        successMessage="Beställning utförd"
      />
    </>
  );
};

export default ScannedManualOrder;
