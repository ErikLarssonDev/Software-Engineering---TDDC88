import * as React from "react";
import NavBar from "../components/NavBar";
import { Box } from "@mui/system";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import SearchArticle from "../components/SearchArticle";
import HomeIcon from "../assets/navBarIcons/HomeIcon";
import CartIcon from "../assets/navBarIcons/CartIcon";

/**
 *
 * @returns The SearchResultPage (View 8).
 */

const SearchResultPage = () => {
  return (
    <Box>
      <NavBar leftIcon={<HomeIcon />} rightIcon={<CartIcon />} />

      <Box display={"flex"} justifyContent={"center"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          margin={0}
          maxWidth={"350px"}
          width={"100%"}
          marginBottom={4}
        >
          <SearchArticle icon={<QrCodeScannerOutlinedIcon />} />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResultPage;
