import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import LoginWithPassword from "./pages/LoginWithPassword";
import LoginPage from "./pages/LoginPage";
import ScanArticlePage from "./pages/ScanArticlePage";
import HomePage from "./pages/homePage/HomePage";
import SearchArticlePage from "./pages/searchArticlePage/SearchArticlePage";
import SearchResultPage from "./pages/SearchResultPage";
import AdjustInventory from "./pages/AdjustInventory";
import CartPage from "./pages/cartPage/CartPage";
import SearchArticleScanPage from "./pages/SearchArticleScanPage";
import AutoOrderPage from "./pages/autoOrderPage/AutoOrderPage";
import ScanArticleAutoOrderPage from "./pages/autoOrderPage/ScanArticleAutoOrderPage";
import ProductSpecification from "./pages/productSpecification/ProductSpecification";
import ManualOrderPage from "./pages/ManualOrderPage";
import ScannedManualOrderPage from "./pages/ScannedManualOrderPage";
import InventoryPage from "./pages/InventoryPage";
import MoveArticlePage from "./pages/MoveArticlePage";
import ConnectArticlePage from "./pages/ConnectArticlePage";
import OrderPage from "./pages/OrderPage";
import ManageOrderPage from "./pages/ManageOrderPage";
import ScanNewStoragePage from "./pages/ScanNewStoragePage";
import EditAutoOrderPage from "./pages/autoOrderPage/EditAutoOrderPage";
import ArticleToMovePage from "./pages/ArticleToMovePage";
import NewStoragePage from "./pages/NewStoragePage";
import RequireAuth from "./components/RequireAuth";
import HomePageInventory from "./pages/HomePageInventory/HomePageInventory";
import ComputerPrintQRPage from "./pages/ComputerPrintQRPage"
import EconomicHistory from "./pages/economicPage/economicHistory";
import EconomicToday from "./pages/economicPage/economicToday";
import MoveArticlePageComputer from "./pages/MoveArticlePageComputer";



const ROLES = {
  'Vårdpersonal' : 1,
  'Förrådsansvarig' : 2,
  'MIV' : 3
}

function App() {
  return (
    <Box
      sx={{
        background:
          "radial-gradient(105.51% 60.72% at 50% 50%, rgba(55, 139, 213, 0) 10.94%, rgba(85, 170, 243, 0.06) 28.65%, rgba(85, 170, 243, 0.31) 99.99%, #3F8EFC 100%)",
        width: "100vw",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login-password" element={<LoginWithPassword />} />
          <Route path="/login" element={<LoginPage />} />
         
          <Route path="/economy-history" element={<EconomicHistory />} />
          <Route path="/economy-today" element={<EconomicToday />} />

         {/*Protected routes */}


          {/* Vårdpersonal */}
         <Route element={<RequireAuth allowedRoles = {[ROLES.Vårdpersonal, ROLES.Förrådsansvarig, ROLES.MIV]} />} >
            <Route path="/home" element={<HomePage />} />
            <Route path="/product-specification" element={<ProductSpecification />} />
            <Route path="/checkout-cart" element={<CartPage />} />
            <Route path="/scan-article" element={<ScanArticlePage />} />
            <Route path="/search-articles" element={<SearchArticlePage />} />
            <Route path="/search-result" element={<SearchResultPage />} />
            <Route path="/adjust-inventory" element={<AdjustInventory />} />
            <Route path="/search-articles-scan" element={<SearchArticleScanPage />} />
          </Route>

          {/* Förrådsansvarig */}
          <Route element={<RequireAuth allowedRoles = {[ROLES.Förrådsansvarig, ROLES.MIV]} />} >
            <Route path="/manage-inventory" element={<InventoryPage />} />
            <Route path="/connect-article" element={<ConnectArticlePage />} />
            <Route path="/home-inventory" element={<HomePageInventory />} />
            <Route path="/auto-order" element={<AutoOrderPage />} />
            <Route path="/scan-article-auto-order" element={<ScanArticleAutoOrderPage />} />'
            <Route path="/manual-order" element={<ManualOrderPage />} />
            <Route path="/move-article" element={<MoveArticlePage />} />
            <Route path="/article-to-move" element={<ArticleToMovePage />} />
            <Route path="/edit-auto-order" element={<EditAutoOrderPage />} />
            <Route path="/manage-order" element={<ManageOrderPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/scanned-manual-order" element={<ScannedManualOrderPage />} />
          </Route>
       

          {/* MIV */}
          <Route element={<RequireAuth allowedRoles = {[ROLES.MIV]} />} >
            <Route path="/scan-new-storage" element={<ScanNewStoragePage />} />
            <Route path="/new-storage" element={<NewStoragePage />} />
            <Route path="print-qr" element={<ComputerPrintQRPage/>} />
           
           
            <Route path="/move-article-computer" element={<MoveArticlePageComputer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
