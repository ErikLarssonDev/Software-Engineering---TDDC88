import * as React from "react";
import NavBar from "../components/NavBar";
import { Box } from "@mui/system";
import MenuIcon from "../assets/navBarIcons/MenuIcon";
import InstructionTextBox from "../components/InstructionTextBox";
import ModernQrScanner from "../components/ModernQrScanner";
import { fetchArticle } from "../utils/articles";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { cart as cartAtom, selected as selectedAtom, articleNewStorage as articleAtom, storage as storageAtom } from "../recoil/atoms";
import { Button } from "@mui/material";
import { useState } from "react";
import { fetchStorage } from "../utils/storages";
import ConnectDialog from "../components/ConnectDialog";
import SuccessDialog from "../components/SuccessDialog";
import { fetchCompartment } from "../utils/compartments";

/**
 *
 * @returns The inventory page component (view 13).
 */

const InventoryPage = () => {
    const [selected, setSelected] = useRecoilState(selectedAtom);
    const cart = useRecoilValue(cartAtom);
    const navigate = useNavigate();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const article = useRecoilValue(articleAtom);
    const [selectedStorage, setSelectedStorage] = useRecoilState(storageAtom);
    const [showFailDialog, setShowFailDialog] = useState(false);

   

    const onScan = async (scannedData) => {

        if (scannedData) {
            const queryRes = await fetchCompartment(scannedData.data);
            setSelectedStorage({ ...queryRes });
         

            if (article.name !== undefined) {
                if (queryRes.compartments !== "") {
                    setShowFailDialog(true);

                    setTimeout(() => {
                        setShowFailDialog(false);
                        navigate("/manage-order")
                    }, 1000);

                } else {
                    setShowConfirmDialog(true);
                }
            } else {
                if (queryRes.article) {
                    navigate("/move-article");
                } else if (!queryRes.article) {
                    navigate("/connect-article");
                }
            }

        }
    };

 

    const handleConnectArticle = () => {
       return
    }

    return (
        <Box>
            {!showConfirmDialog && !showFailDialog && (
                <>
                    <NavBar leftIcon={<MenuIcon />} />
                    <InstructionTextBox text="Hantera lager" />
                    <ModernQrScanner onScan={onScan} />
                </>
            )}

            {showConfirmDialog && (
                <>
                    <InventoryPage />
                    <ConnectDialog
                        article={article.name}
                        lioNr={article.lioNr}
                        storageId={selectedStorage.compartments?.storageId}
                        placement={selectedStorage.compartments?.placement}
                        targetPage={"../manage-order"}
                        open={showConfirmDialog}
                        onClose={() => setShowConfirmDialog(false)}
                        successMessage="Artikel kopplad"
                        defaultButtons={true}
                        onConfirm={handleConnectArticle}
                    >
 
                    </ConnectDialog>

                </>)}

            {showFailDialog && (
                <>
                    <InventoryPage />
                    <SuccessDialog
                        message="Lagerplats upptagen"
                        open={showFailDialog}
                        failiure={true} />
                </>)}
        </Box>
    );
};
export default InventoryPage;
