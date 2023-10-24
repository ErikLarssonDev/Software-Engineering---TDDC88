import { Box } from "@mui/material";
import { React } from "react";
import ModernQrScanner from "../components/ModernQrScanner";
import NavBar from "../components/NavBar";
import HomeIcon from "../assets/navBarIcons/HomeIcon";
import CartIcon from "../assets/navBarIcons/CartIcon";

/**
 * 
 * @returns The page where a user can scan an article that they are searching for. This is the page the user comes to
 * after pressing the QR-icon on the SearchArticlePage. (view 7.2)
 */

const SearchArticleScanPage = () => {
    return (
        <Box>
            <NavBar leftIcon={<HomeIcon />} rightIcon={<CartIcon />} />
            <ModernQrScanner />
        </Box>
    );
};

export default SearchArticleScanPage;
