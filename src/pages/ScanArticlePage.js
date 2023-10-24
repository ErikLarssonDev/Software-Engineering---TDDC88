import { Box } from "@mui/material";
import { React } from "react";
import ModernQrScanner from "../components/ModernQrScanner";
import NavBar from "../components/NavBar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeIcon from "../assets/navBarIcons/HomeIcon";
import CartIcon from "../assets/navBarIcons/CartIcon";
import { fetchArticle } from "../utils/articles";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import SuccessDialog from "../components/SuccessDialog";
import { useState } from 'react';
import { fetchArticleLio } from "../utils/articles";
import { fetchArticleName } from "../utils/articles";
import { cart as cartAtom, selected as selectedAtom, search as searchAtom, selectedSearch as selectedSearchAtom, selectedCompartment as selectedCompartmentAtom } from "../recoil/atoms";
import SearchArticle from "../components/SearchArticle";
import { fetchCompartment, fetchCompartmentLio } from "../utils/compartments";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

/**
 *
 * @returns The scan article page where the user can scan a QR code or input the LIO id of an article.
 */
 
const ScanArticlePage = () => {
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [selectedSearch, setSelectedSearch] = useRecoilState(selectedSearchAtom);
  const [selectedCompartment, setSelectedCompartment] = useRecoilState(selectedCompartmentAtom);
  const [search, setSearch] = useRecoilState(searchAtom);
  const [showDialog, setShowDialog] = useState(false);
  const cart = useRecoilValue(cartAtom);
  const navigate = useNavigate();
  const [error, setError] = useState("");
 //Return the error message that is appropriate.TODO



  const onScan = async (scannedData) => {
    setSearch(false)
    if (scannedData) {
      const queryRes = await fetchCompartment(scannedData.data);
      
      if (queryRes.article) {

       
        setSelected({ ...queryRes, amount: 0 });
        navigate("/product-specification");

      } else {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 3000);

        return;
      }
  } 
  };

  const onSearch = async (searchedArticle) => { //TODO: This function should maybe be a util?
    setSearch(true)
    setError("")
    if (searchedArticle) {
      // If the user searches by LIO number.
      if (!isNaN(searchedArticle)) {
        const queryRes = await fetchArticleLio(searchedArticle);
        if (queryRes?.lioNr === undefined) {
          
          setError("Ogiltigt LIO-nummer")
        } else {
          setError("") 
          const currentStorageId = sessionStorage.getItem("storageId");
          var filteredCompartments = queryRes.compartments.filter((c) => {
            return (c.storageId.localeCompare(currentStorageId) == 0) ;                  
          });
          setSelectedCompartment(filteredCompartments[0]);
          

          
          //var filteredCompartments = queryRes.compartments.filter(c => 
          //{return c.storageId === currentStorageId[0]})

          if (filteredCompartments) {
            queryRes.compartments = filteredCompartments;
            setSelectedSearch({ ...queryRes, amount: 0, quantity: filteredCompartments[0].quantity });
          } else {
            setError("Artikeln finns inte i detta lager"); 
          }
         
          setSearch(true);
          navigate("/product-specification");
        }
      } else {
        // If the user searches by article name.
        const queryRes = await fetchArticleName(
          searchedArticle.charAt(0).toUpperCase() + searchedArticle.slice(1)
        );
        if (queryRes.name === undefined) {
          setError("Ogiltigt artikelnamn")
        } else {
          setError("")
          setSearch(false)
          const currentStorageId = sessionStorage.getItem("storageId");
          var filteredCompartments = queryRes.compartments.filter((c) => {
            return (c.storageId == currentStorageId) ;                  
          });
          //var filteredCompartments = queryRes.compartments.filter(c => 
          //{return c.storageId === currentStorageId[0]})

          if (filteredCompartments) {
            queryRes.compartments = filteredCompartments;
            setSelectedSearch({ ...queryRes, amount: 0, quantity: filteredCompartments[0].quantity });
            setSelectedCompartment(filteredCompartments[0]);
          } else {
            setError("Artikeln finns inte i detta lager"); 
          }
          
          setSearch(true);
          navigate("/product-specification");
        }
      }
    } else {
      setError("Något gick fel...")
      return;
    }
  };

  return (
    <Box>
      <NavBar leftIcon={<HomeIcon />} rightIcon={<CartIcon />} />
      <ModernQrScanner onScan={onScan} />
      <SuccessDialog
        message="Ingen artikel kopplad till QR-kod"
        open={showDialog}
        failiure={true}
      />
      <Box display={"flex"} justifyContent={"center"} marginTop={5}>
        <SearchArticle icon={<SearchOutlinedIcon />}
        onSearch={onSearch}
        error={error} />

      </Box>
    </Box>
  );
};

export default ScanArticlePage;
