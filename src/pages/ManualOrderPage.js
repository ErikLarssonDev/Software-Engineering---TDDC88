import { Box } from "@mui/material";
import { React, useState } from "react";
import ModernQrScanner from "../components/ModernQrScanner";
import NavBar from "../components/NavBar";
import MenuIcon from "../assets/navBarIcons/MenuIcon";
import { fetchArticle, fetchArticleLio, fetchArticleName } from "../utils/articles";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { cart as cartAtom, selected as selectedAtom, search as searchAtom, selectedSearch as selectedSearchAtom, selectedCompartment as selectedCompartmentAtom } from "../recoil/atoms";
import { fetchCompartment, fetchCompartmentLio } from "../utils/compartments";
import SearchArticle from "../components/SearchArticle";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


/**
 *
 * @returns The manual order page is where the user can scan a QR code or input the LIO id of an article in order to
 * do a manual order of the chosen item. Views in figma: S11 &S11.1
 */

const ManualOrderPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [selectedSearch, setSelectedSearch] = useRecoilState(selectedSearchAtom);
  const [selectedCompartment, setSelectedCompartment] = useRecoilState(selectedCompartmentAtom);
  const [search, setSearch] = useRecoilState(searchAtom);
  const [error, setError] = useState("") //returns appropriate error message
  const [showDialog, setShowDialog] = useState(false);

  /**
   * 
   * @param {string} scannedData 
   * @returns The article from the database with a matching QR code id to the scanned data.
   */
  const onScan = async (scannedData) => {
    setSearch(false)
    if (scannedData) {
      const queryRes = await fetchCompartment(scannedData.data);
      if (queryRes.article) {


        setSelected({ ...queryRes, amount: 0 });
        navigate("/scanned-manual-order");

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
            return (c.storageId.localeCompare(currentStorageId) == 0);
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
          navigate("/scanned-manual-order");
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
            return (c.storageId == currentStorageId);
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
          navigate("/scanned-manual-order");
        }
      }
    } else {
      setError("Något gick fel...")
      return;
    }
  };
  return (
    <Box>
      <NavBar leftIcon={<MenuIcon />} />{" "}
      <ModernQrScanner onScan={onScan} title={"Manuell beställning"} />
      <Box display={"flex"} justifyContent={"center"} marginTop={5}>
        <SearchArticle icon={<SearchOutlinedIcon />}
          onSearch={onSearch}
          error={error} />
      </Box>
    </Box>
  );
};

export default ManualOrderPage;
