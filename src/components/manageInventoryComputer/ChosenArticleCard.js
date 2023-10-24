import React from "react";
import { Box, Card, CardContent, Typography, TextField } from "@mui/material";
import MediumButton from "../../components/MediumButton";
import SuccessDialog from "../../components/SuccessDialog";
import { useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import { useNavigate } from "react-router-dom";
import { changeQuantity } from "../../utils/articles";
import { useRecoilState } from "recoil";
import { selected as selectedAtom, storage as storageAtom } from "../../recoil/atoms";
import { updateStorageQuantity } from "../../utils/storages";

/**
 *
 * @returns The chosen article card component (used in view M13.3)
 */
const ChosenArticleCard = ({
    handleAdjustClose,
    displayStorages,
    product,
    lioNum,
    //storage,
    shelf,
    compartment,
    deliveryDate,
    deliveryAmount,
    balance,
}) => {

    const [selected, setSelected] = useRecoilState(selectedAtom);
    const [open, setOpen] = useState(false);
    const [newQuantity, setNewQuantity] = useState(selected.quantity)
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [storage, setStorage] = useRecoilState(storageAtom);

    const handleSuccessDialog = () => {
        if (newQuantity >= 0) {

            setTimeout(() => {
                handleAdjustClose();
                displayStorages();
                setOpen(false);
                navigate("/move-article-computer");
                setError(false)
            }, 1000)
        } else {
            setError(true)
        };
    };

    // When selecting the storage to move to
    const handleChangeQuantity = async (val) => {
        setNewQuantity(val);
        await updateStorageQuantity(storage.id, storage, parseInt(val));
    };
    return (
        <Box
            sx={{
                // width: "100%",
                // maxHeight: "243px",
                // height: "100%",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "row",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                backgroundColor: "#FFF",
            }}
        >
            <CardContent>
                <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
                    Vald artikel
                </Typography>
                <Box sx={{ ml: "15px" }}>
                    <Typography
                        sx={{
                            mt: "15px",
                            mb: "4px",
                            fontSize: "24px",
                            fontWeight: 400,
                            wordBreak: "break-word",
                        }}
                    >
                        {product}
                    </Typography>
                    <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                        LIO-nummer: {storage.compartments?.article?.lioNr}
                    </Typography>
                    <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                        {/* Lager {selected.storageId} &gt; {selected.placement} */}
                        Lager: {storage.compartments?.placement}

                    </Typography>
                    {/* <Typography
                        sx={{
                            mt: "4px",
                            fontStyle: "italic",
                            fontSize: "15px",
                            fontWeight: 300,
                        }}
                    >
                        Nästa leverans: {deliveryDate}
                    </Typography>
                    <Typography
                        sx={{ fontStyle: "italic", fontSize: "15px", fontWeight: 300 }}
                    >
                        Antal: { } kartonger
                    </Typography> */}
                    <Typography
                        sx={{ mt: "16px", fontSize: "24px", fontWeight: 400 }}
                    >
                        Nuvarande lagersaldo
                    </Typography>
                    <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                        Antal: {storage.compartments?.quantity} lådor
                    </Typography>
                    <Typography
                        sx={{ mt: "16px", fontSize: "24px", fontWeight: 400 }}
                    >
                        Nytt lagersaldo
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            mb: "5px",
                            mt: "5px",
                        }}
                    >
                        <Typography sx={{ fontSize: "16px", fontWeight: 300 }}>
                            Antal:
                        </Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            type='number'
                            value={newQuantity}
                            // onChange={(e) => setNewQuantity(e.target.value)}
                            onChange={(e) => handleChangeQuantity(e.target.value)}

                            inputProps={{
                                style: {
                                    height: "4px",
                                    fontSize: "16px",
                                    width: "45px",
                                    backgroundColor: "rgba(217, 217, 217, 0.47)",
                                },
                            }}
                            sx={{
                                ml: "10px",
                            }}
                        />

                    </Box>
                    {error && (

                        <Typography
                            sx={{ color: 'red' }}>
                            Felaktig inmatning <ReportIcon /></Typography>
                    )}
                </Box>
                <Box sx={{
                    mt: "50px",
                }}>
                    <MediumButton
                        text="Godkänn"
                        bgColor="rgba(48, 235, 123, 0.15)"
                        onClick={handleSuccessDialog}
                    />
                </Box>
                {/* The success dialog pop-up which appears after clicking "Godkänn" */}
                <SuccessDialog message="Saldo uppdaterat" open={open} />
            </CardContent>
        </Box>
    );
};

export default ChosenArticleCard;
