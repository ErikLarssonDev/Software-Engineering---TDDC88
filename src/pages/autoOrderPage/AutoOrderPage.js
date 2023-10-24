import * as React from "react";
import NavBar from "../../components/NavBar";
import { Box } from "@mui/system";
import MenuIcon from "../../assets/navBarIcons/MenuIcon";
import AddIcon from "../../assets/navBarIcons/AddIcon";
import { Typography } from "@mui/material";
import ListOfOrders from "./components/ListOfOrders";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAllArticles } from "../../utils/articles";
import SearchArticle from "../../components/SearchArticle";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import SuccessDialog from "../../components/SuccessDialog";
import { cart as cartAtom, selected as selectedAtom } from "../../recoil/atoms";
import { fetchArticle, fetchArticleLio, fetchArticleName } from "../../utils/articles";

/**
 *
 * @returns The order overview component.
 */

const AutoOrderPage = () => {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("") //Return the error message that is appropriate.TODO

  //useEffect --> get all articles
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllArticles()
      setArticles(result);
    }
    fetchData().catch(console.error)

  }, []);

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
      <NavBar
        leftIcon={<MenuIcon />}
        rightIcon={<AddIcon path={"/scan-article-auto-order"} />}
      />
      <Typography
        align="center"
        marginLeft={3}
        marginRight={3}
        sx={{ fontSize: "32px", fontWeight: "600", alignItems: "center" }}
      >
        Autobeställningar för lager: {sessionStorage.getItem("storageId")}
      </Typography>
      <SearchArticle
        icon={
          <Link to="/scan-article-auto-order">
            <QrCodeScannerOutlinedIcon />
          </Link>
        }
        onSearch={onSearch} error={error}
      />
      {/* Pass in articles */}
      <ListOfOrders articles={articles} />
    </Box>
  );
};

export default AutoOrderPage;
