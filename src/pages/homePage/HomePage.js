import { Box } from "@mui/material";
import React from "react";
import LargeButton from "../../components/LargeButton";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import AccountIcon from "../../assets/navBarIcons/AccountIcon";
import LogoutNurseIcon from "../../assets/navBarIcons/LogoutIcon";
import CartIcon from "../../assets/navBarIcons/CartIcon";
import { Link } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { fetchArticles } from "../../utils/articles"
import { articles as articlesAtom } from '../../recoil/atoms';
import { useEffect } from "react";
import { selected as selectedAtom, selectedSearch as selectedSearchAtom } from '../../recoil/atoms'
/**
 *
 * @returns The homepage component.
 */

const HomePage = () => {
  const [articles, setArticles] = useRecoilState(articlesAtom);

  const handleNavigationArticle = (query) => {
    setArticles(query)
  }
  const queryArticleDatabase = async () => {
    //API calls, get orders. Saved in ordersAtom
    return await fetchArticles()
  }
  const handleArticle = async () => {
    handleNavigationArticle(await queryArticleDatabase())
  }
  //const [selected, setSelected] = useRecoilState(selectedAtom);
  //const [selectedSearch, setSelectedSearch] = useRecoilState(selectedSearchAtom);
  //setSelected({});
  //setSelectedSearch({});
  const resetSelected = useResetRecoilState(selectedAtom);
  const resetSelectedSearch = useResetRecoilState(selectedSearchAtom);

  useEffect(() => {
    resetSelected();
    resetSelectedSearch();
  }, []);
  return (
    <Box>
      <NavBar leftIcon={<LogoutNurseIcon />} rightIcon={<CartIcon />} />
      <Header />
      <Box
        marginTop={12}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Link to="/scan-article" style={{ textDecoration: "none" }}>
          <LargeButton
            text={"Skanna artikel"}
            icon={<QrCodeScannerOutlinedIcon sx={{ fontSize: "32px" }} />}
          />
        </Link>
        <Link to="/search-articles" style={{ textDecoration: "none" }}>
          <LargeButton
            text={"Sök artikel"}
            onClick={handleArticle}
            icon={<SearchOutlinedIcon sx={{ fontSize: "32px" }} />}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default HomePage;
