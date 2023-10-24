import { Box } from "@mui/material";
import React from "react";
import LargeButton from "../../components/LargeButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import MenuIcon from "../../assets/navBarIcons/MenuIcon";
import CartIcon from "../../assets/navBarIcons/CartIcon";
import { Link } from "react-router-dom";
import { cart as cartAtom } from '../../recoil/atoms'
import { useRecoilValue } from "recoil";
import { fetchOrders } from "../../utils/orders";
import { orders as ordersAtom } from '../../recoil/atoms'
import { useRecoilState } from "recoil";
import { fetchArticles } from "../../utils/articles"
import { articles as articlesAtom } from '../../recoil/atoms';

/**
 *
 * @returns The homepage component for inventory staff. View S2.
 */

const HomePageInventory = () => {
  const cart = useRecoilValue(cartAtom)
  //Used to navigate to OrderPage with all orders saved in ordersAtom
  const [orders, setOrders] = useRecoilState(ordersAtom);
  const [articles, setArticles] = useRecoilState(articlesAtom);

  const handleNavigation = (query) => {
    setOrders(query)
  }
  const queryDatabase = async () => {
    //API calls, get orders. Saved in ordersAtom
    return await fetchOrders()
  }
  const handleOrders = async () => {
    handleNavigation(await queryDatabase())
  }
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
  return (

    <Box>
      <NavBar leftIcon={<MenuIcon />} rightIcon={<CartIcon />} />
      <Header />
      <Box
        marginTop={12}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Link to="/order" style={{ textDecoration: "none" }}>
          <LargeButton text={"Beställningar"} onClick={handleOrders} /> 
        </Link>

        <Link to="/manage-inventory" style={{ textDecoration: "none" }}>
          <LargeButton text={"Hantera Lager"} />
        </Link>

        <Link to="/scan-article" style={{ textDecoration: "none" }}>
          <LargeButton text={"Skanna för uttag"} />
        </Link>

        <Link to="/search-articles" style={{ textDecoration: "none" }}>
          <LargeButton text={"Sök artikel"} onClick={handleArticle} />
        </Link>
      </Box>
    </Box>
  );
};

export default HomePageInventory;