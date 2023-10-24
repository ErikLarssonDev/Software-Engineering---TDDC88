import * as React from "react";
import NavBar from "../../components/NavBar";
import { Box } from "@mui/system";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import SearchArticle from "../../components/SearchArticle";
import HomeIcon from "../../assets/navBarIcons/HomeIcon";
import CartIcon from "../../assets/navBarIcons/CartIcon";
import { useState } from "react";
import { fetchArticleLio } from "../../utils/articles";
import { fetchArticleName } from "../../utils/articles";
import SearchResultCard from "../../components/SearchResultCard";
import { useRecoilState } from "recoil";
import { selectedSearch as selectedSearchAtom, search as searchAtom } from '../../recoil/atoms';
import { articles as articlesAtom } from '../../recoil/atoms';


/**
 *
 * @returns The SearchArticlePage (View 7).
 */

const SearchArticlePage = () => {
  const [article, setArticle] = useState("");
  const [error, setError] = useState("") //Return the error message that is appropriate.TODO
  const [selectedSearch, setSelectedSearch] = useRecoilState(selectedSearchAtom);
  const [articles, setArticles] = useRecoilState(articlesAtom);
  const [search, setSearch] = useRecoilState(searchAtom);

  const onSearch = async (searchedArticle) => { //TODO: This function should maybe be a util?
    setArticle("");
    setError("");
    if (searchedArticle) {
      // If the user searches by LIO number.
      if (!isNaN(searchedArticle)) {
        const queryRes = await fetchArticleLio(searchedArticle);
        if (queryRes.lioNr === undefined) {
          setError("Ogiltigt LIO-nummer")
        } else {
          setError("")
          setSelectedSearch(queryRes);
          setSearch(true);
          setArticles("");
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
          setSelectedSearch(queryRes);
          setSearch(true);
          setArticles("");
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
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          margin={5}
          maxWidth={"400px"}
          width={"100%"}
        >
          <SearchArticle
            onSearch={onSearch}
            error={error}
          />
          <Box display={"flex"} flexDirection={"column"} marginTop={1}>
            {/* Renders the searched article */}
            {articles !== "" ?
              articles.map((arts) => {
                return (arts.compartments.map((comp) => {
                  return <SearchResultCard key={[arts.name, comp.storageId]} compartment={comp} name={arts.name} lioNr={arts.lioNr} />
                }))
              }) : selectedSearch.compartments.map((selComp) => {
                return <SearchResultCard key={[selectedSearch.name, selComp.storageId]} compartment={selComp} name={selectedSearch.name} lioNr={selectedSearch.lioNr} />
              })
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchArticlePage;
