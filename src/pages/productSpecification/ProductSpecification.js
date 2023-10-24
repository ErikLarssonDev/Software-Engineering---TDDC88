import * as React from "react";
import Box from "@mui/material/Box";
import NavBar from '../../components/NavBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ProductSpecificationCard from '../../components/ProductSpecificationCard';
import ProductSpecificationButton from '../../components/ProductSpecificationButton';
import ScannedArticleCard from '../../components/ScannedArticleCard';
import HomeIcon from '../../assets/navBarIcons/HomeIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog';
import SuccessDialog from '../../components/SuccessDialog';
import { changeQuantity } from "../../utils/compartments";
import { cart as cartAtom,  selected as selectedAtom, selectedSearch, selectedSearch as selectedSearchAtom, search as searchAtom, selectedCompartment as selectedCompartmentAtom} from '../../recoil/atoms'
import { useRecoilState, useRecoilValue } from 'recoil';
import { remaining, remainingAfterReturned } from "../../utils/cart";

const ProductSpecification = () => {
  // All states except recoil (global)
  const [openCartConf, setOpenCartConf] = useState(false);
  const [openKassera, setOpenKassera] = useState(false); 
  const [quantityExceded, setQuantityExceded] = useState(false);
  const [openRetrieveConf, setOpenRetrieveConf] = useState(false); 
  const [count, setCount] = useState(0);
  

  
  const navigate = useNavigate();


  const TempCartConf = () => {
    setOpenCartConf(true);
    setTimeout(() => {
      setOpenCartConf(false);
      navigate("/scan-article");
    }, 1000);
  };

  /*
    This implements view 4 and 4.4 so that the customer the product specifications can be viewed. 
    @param
    */
   // Global recoil states 
  const [cart, setCart] = useRecoilState(cartAtom);
  const selected = useRecoilValue(selectedAtom);
  const selectedSearch = useRecoilValue(selectedSearchAtom);
  const search = useRecoilValue(searchAtom);
  const selectedCompartment = useRecoilValue(selectedCompartmentAtom);
  // console.log(selected)

  
  const returnItem = () => {
    if (search) {
    changeQuantity("", selectedCompartment.qrCode, selectedCompartment.storageId, selectedSearch.amount, "return")
    } else {
    changeQuantity("",selected.qrCode, selected.storageId, selected.amount, "return"); 
  }
  };

  const discardItem = () => {
    if (search) {
      changeQuantity("", selectedCompartment.qrCode, selectedCompartment.storageId, selectedSearch.amount, "takeout")
    } else {
    changeQuantity("",selected.qrCode, selected.storageId, selected.amount, "takeout");
  }
  };

  const preventWrongQuantity = () => {
    
  if (!search) {
    if (selected.amount <= selected.quantity) {
      addToCart();
    } else {
      setQuantityExceded(true);
      setTimeout(() => {
        setQuantityExceded(false);
        navigate("/product-specification")
    }, 1000); 
    }
  } else {
    if (selectedSearch.amount <= selectedSearch.quantity) {
      addToCart();
    } else {
      setQuantityExceded(true);
      setTimeout(() => {
        setQuantityExceded(false);
        navigate("/product-specification")
    }, 1000);
    }
  }
  }

  const addToCart = () => {

    TempCartConf()
    var newItem = true;
    const newCart = cart.map((item) => {
      if (!search) {
      if (item.lioNr === selected.lioNr) {
        newItem = false;
        return { ...item, amount: selected.amount };
      } else {
        return item;
      }
    } else {

      if (item.lioNr === selectedSearch.lioNr) {
        newItem = false;
        return { ...item, amount: selectedSearch.amount };
      } else {
        return item;
      }
    }
      
    });

    setCart(newCart);
    if (newItem) {
      setCart((cart) => [
        ...cart,
        {
          lioNr: search ? selectedSearch.lioNr : selected.article.lioNr,
          name: search ? selectedSearch.name : selected.article.name,
          amount: search ?  selectedSearch.amount : selected.amount, 
          storageId: search ? selectedCompartment.storageId : selected.storageId,
          quantity: search ? selectedSearch.quantity : selected.quantity,
          qrCode: search ?  selectedCompartment.qrCode : selected.qrCode,
        },
      ]);
    }

  };

  return (
    <>
    
      <Box > 
        <NavBar leftIcon={<HomeIcon />} />
        
        <Box
          display={"flex"} 
          flexDirection={"column"}
          alignItems={"center"}
          paddingBottom={5}
        >
        <ScannedArticleCard sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}/>
       
        <ProductSpecificationCard sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} 
        count={count} setCount={setCount} text= {search ? selectedSearch.outputUnit.charAt(0).toUpperCase() + selectedSearch.outputUnit.slice(1) : selected.article.outputUnit.charAt(0).toUpperCase() + selected.article.outputUnit.slice(1)} />

       
          <Card
          
            sx={{
              borderRadius: "12px",
              width: "90%" ,
              minWidth:310,
              border: 1,
              borderColor: "#D0D4D9",
              boxShadow: 4,
              marginTop:4,
            }}
          >
            <CardContent
              sx={{ fontSize: 40 }}
              style={{ color: "black" }}
              align="center"
            >
              <ProductSpecificationButton
                bgColor={"#D8FCE8"}
                text={"Lägg till i kundvagnen"}
                onClick={preventWrongQuantity}
              ></ProductSpecificationButton>
              <ProductSpecificationButton
                bgColor={"#FC3F3F26"}
                text={"Kassera Artikel"}
                onClick={() => setOpenKassera(true)}
              ></ProductSpecificationButton>
              <ProductSpecificationButton
                bgColor={"#FBFFDF"}
                text={"Lämna tillbaka artikel"}
                onClick={() => setOpenRetrieveConf(true)}
                
              ></ProductSpecificationButton>
            </CardContent>
          </Card>
        </Box>
        </Box>
      
      <SuccessDialog message={"Artikeln Tillagd"} open={openCartConf} />
      <SuccessDialog message={"För hög kvantitet"} open={quantityExceded} failiure={true}></SuccessDialog>
      <ConfirmDialog
        message="Bekräfta Kassering?"
        open={openKassera}
        onClose={() => setOpenKassera(false)}
        onConfirm={discardItem}
        targetPage="/scan-article"
        successMessage="Artikeln Kasserad"
      />
      <ConfirmDialog
        message="Bekräfta lämna tillbaka"
        open={openRetrieveConf}
        onClose={() => setOpenRetrieveConf(false)}
        onConfirm={returnItem}
        targetPage="/scan-article"
        successMessage="Artikeln Mottagen"
      />
    </>
  );
};

export default ProductSpecification;
