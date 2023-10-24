
import { Box } from "@mui/material";
import { React, useState, PureComponent } from "react";
import { fetchArticle, fetchArticleLio, fetchArticleName } from "../../utils/articles";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { selected as selectedAtom } from "../../recoil/atoms";
import SearchArticle from "../../components/SearchArticle";
import ProductCardComputer from "../../components/computer/ProductCardComputer"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NavBarComputer from "../../components/NavBarComputer";


/**
 *
 * @returns The manual order page is where the user can scan a QR code or input the LIO id of an article in order to
 * do a manual order of the chosen item. Views in figma: S11 &S11.1
 */

const EconomicHistory = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [error, setError] = useState("") //returns appropriate error message
  const [article, setArticle] = useRecoilState(selectedAtom);
  const selectedArticle = useRecoilValue(selectedAtom);


  /**
   * 
   * @returns The article from the database with a matching QR code id to the scanned data.
   */

  const onSearch = async (searchedArticle) => { //TODO: Fix so the search is limited to the article for the storage you are currenty loged into
    setError("")
    if (searchedArticle) {
      // If the user searches by LIO number.
      if (!isNaN(searchedArticle)) {
        const queryRes = await fetchArticleLio(searchedArticle);
        if (queryRes.lioNr === undefined) {
          setError("Ogiltigt LIO-nummer")
        } else {
          setError("");
          setSelected({ ...queryRes, amount: 0 });
          /*navigate("/scanned-manual-order");*/
        }
      } else {
        // If the user searches by article name.
        const queryRes = await fetchArticleName(
          searchedArticle.charAt(0).toUpperCase() + searchedArticle.slice(1)
        );
        if (queryRes.name === undefined) {
          setError("Ogiltigt artikelnamn")
        } else {
          setError("");
          setSelected({ ...queryRes, amount: 0 });
          /*navigate("/scanned-manual-order");*/
        }
      }
    } else {
      setError("Något gick fel...")
      return;
    }
  };


  return (
    <Box>
      <NavBarComputer></NavBarComputer>
      <Box sx={{ width: '50%', mt: 4 }}>
        <Box sx={{
          width: '78%',
          marginLeft: '90px',
        }}>
          <SearchArticle icon={<SearchOutlinedIcon />}
            onSearch={onSearch}
            error={error} />
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <ProductCardComputer></ProductCardComputer>
      </Box>

    </Box>
  );
};

export default EconomicHistory;
