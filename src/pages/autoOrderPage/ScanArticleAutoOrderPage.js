import { Box } from "@mui/material";
import { React } from "react";
import ModernQrScanner from "../../components/ModernQrScanner";
import NavBar from "../../components/NavBar";
import MenuIcon from "../../assets/navBarIcons/MenuIcon";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import SuccessDialog from "../../components/SuccessDialog";
import { useState } from 'react';
import { cart as cartAtom, selected as selectedAtom } from "../../recoil/atoms";
import SearchArticle from "../../components/SearchArticle";
import { fetchArticle, fetchArticleLio, fetchArticleName } from "../../utils/articles";





/**
 * 
 * @returns The scan article page where the user can scan a QR code or input the LIO id/name of an article. View S12.3
 */

const ScanArticleAutoOrderPage = () => {
const [selected, setSelected] = useRecoilState(selectedAtom);
  const [showDialog, setShowDialog] = useState(false);
  const cart = useRecoilValue(cartAtom);
  const navigate = useNavigate();
  const [error, setError] = useState("") //Return the error message that is appropriate.TODO

  const onScan = async (scannedData) => {
    if (scannedData) {
      const queryRes = await fetchArticle(scannedData.data);
      if (queryRes.lioNr != null) {
        setSelected({ ...queryRes, amount: 0 });
        navigate("/edit-auto-order");
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
    setSelected("");
    setError("")
    if (searchedArticle) {
      // If the user searches by LIO number.
      if (!isNaN(searchedArticle)) {
        const queryRes = await fetchArticleLio(searchedArticle);
        if (queryRes.lioNr === undefined) {
          setError("Ogiltigt LIO-nummer")
        } else {
          setError("")
          setSelected({ ...queryRes, amount: 0 });
        navigate("/edit-auto-order");
        }
      } else {
        // If the user searches by article name.
        const queryRes = await fetchArticleName(
          searchedArticle.charAt(0).toUpperCase() + searchedArticle.slice(1)
        );
        if (queryRes.name === undefined) {
          setError("Ogiltigt namn")
        } else {
          setError("")
          setSelected({ ...queryRes, amount: 0 });
        navigate("/edit-auto-order");
        }
      }
    } else {
      setError("Något gick fel...")
      return;
    }
  };


    return (
        <Box>
            <NavBar leftIcon={<MenuIcon />} />
            <ModernQrScanner title={"Skanna artikel"} onScan={onScan} />
            <SuccessDialog
        message="Ingen artikel kopplad till QR-kod"
        open={showDialog}
        failiure={true}
      />
            <Box display={"flex"} justifyContent={"center"} marginTop={5}>
                <SearchArticle icon={<SearchOutlinedIcon/>} onSearch={onSearch} error={error} />
            </Box>
        </Box>
    );
};

export default ScanArticleAutoOrderPage;
