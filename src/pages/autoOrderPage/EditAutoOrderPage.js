import React from "react";
import { Typography, Box, CardContent, Card } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MediumButton from "../../components/MediumButton";
import SuccessDialog from "../../components/SuccessDialog";
import TextField from '@mui/material/TextField';
import { changeAutoOrder } from "../../utils/articles";
import NavBar from "../../components/NavBar";
import MenuIcon from "../../assets/navBarIcons/MenuIcon";
import { useRecoilState, useRecoilValue } from "recoil";
import { selected as selectedAtom, selectedSearch as selectedSearchAtom, selectedCompartment as selectedCompartmentAtom, search as searchAtom } from "../../recoil/atoms";



/**
 *
 * @param {message} param0 A string that decides the text on the confirm dialog.
 * @param {successMessage} param4 A string that decides the displayed message on success.
 * @returns The page for editing the values of normalOrderQuantity, orderQuantityLevel. View S12.1
 */


const EditAutoOrderPage = ({ 
    message,
    successMessage,
}) => {

    const [selected, setSelected] = useRecoilState(selectedAtom);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const [newQuantity, setNewQuantity] = useState(selected.normalOrderQuantity)
    const [newQuantityLevel, setNewQuantityLevel] = useState(selected.orderQuantityLevel)
    const [showFailDialog, setShowFailDialog] = useState(false);
    const selectedCompartment = useRecoilValue(selectedCompartmentAtom);
    const selectedSearch = useRecoilValue(selectedSearchAtom);
    const search = useRecoilValue(searchAtom);


    const handleConfirm = () => {
        setSelected({ ...selected, normalOrderQuantity: newQuantity, orderQuantityLevel: newQuantityLevel })
        if (newQuantity < 0 || newQuantityLevel < 0){
            setShowFailDialog(true);
            setTimeout(() => {
                setShowFailDialog(false);
                navigate("/edit-auto-order")
            }, 1000);
            
        }else{
        changeAutoOrder(selected.id, newQuantity, newQuantityLevel);

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            navigate("/auto-order");
        }, 1500);
        }
    };

    return (
        <Box>
            <NavBar leftIcon={<MenuIcon path={""} />} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "350px",
                    margin: "auto",
                }}
            >
                <Card
                    sx={{
                        width: "350px",
                        height: "537px",
                        mt: "90px",
                        borderRadius: "12px",
                        border: "1px solid #D0D4D9",
                    }}
                >
                    <CardContent>

                        <Typography
                            sx={{
                                fontSize: "32px",
                                fontWeight: 400,
                                textAlign: "center",
                                margin: "10px auto 5px auto",
                                wordBreak: "break-word",
                                width: "275px",
                            }}
                        >
                            Vald artikel
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "24px",
                                fontWeight: 400,
                                wordBreak: "break-word",
                                width: "275px",
                            }}
                        >
                            {selected.name}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: 300,
                                wordBreak: "break-word",
                                width: "275px",
                            }}
                        >
                            {selected.lioNr}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: 300,
                                wordBreak: "break-word",
                                width: "275px",
                            }}
                        >
                            {search ? selectedCompartment.storageId : selected.placement}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 3,
                                fontSize: "24px",
                                fontWeight: 400,
                                wordBreak: "break-word",
                                width: "275px",
                            }}
                        >
                            Beställningspunkt
                        </Typography>

                        <Box
                            sx={{
                                mt: 1,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                id="outlined-number"
                                type="number"
                                defaultValue={newQuantityLevel}
                                onChange={(e) => {
                                    setNewQuantityLevel(e.target.value)
                                }}
                            />
                        </Box>
                        
                        <Typography
                            sx={{
                                mt: 2,
                                fontSize: "24px",
                                fontWeight: 400,
                                wordBreak: "break-word",
                                width: "275px",
                            }}
                        >
                            Beställningsmängd
                        </Typography>
                        <Box
                            sx={{
                                mt: 1,
                                mb:3,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                id="outlined-number"
                                type="number"
                                defaultValue={newQuantity}
                                onChange={(e) => setNewQuantity(e.target.value)}
                            />
                        </Box>

                        <MediumButton text="Godkänn" bgColor="#DEFFDF" onClick={handleConfirm} />
                        <SuccessDialog message={"Beställning uppdaterad"} open={showSuccess}/>
                        <SuccessDialog message={"Ordervariabel kan inte vara negativ"} open={showFailDialog} failiure={true}/>

                    </CardContent>
                </Card>
            </Box>
        </Box>

    );
};

export default EditAutoOrderPage;
