import { useState } from "react"
import { Dialog, Box, Select, InputLabel, MenuItem, FormControl } from "@mui/material";
import SmallButton from "../components/SmallButton";
import { useNavigate } from "react-router-dom";

const ChooseStorageDialog = ({
    costCenters,
    open,
    role
}) => {
    const [chosenCostCenter, setChosenCostCenter] = useState('');
    const [showSelectError, setShowSelectError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setChosenCostCenter(e.target.value);
    }

    const handleSubmit = (e) => {
        if (!chosenCostCenter) {
            setShowSelectError(true);
        } else {
            sessionStorage.setItem("storageId", chosenCostCenter)
            if (role === 1) {
                navigate("/home")
            } else if (role === 2 || role === 3) {
                navigate("/home-inventory")
            }
        }
    }

    return (
        <>
            <Dialog
                open={open}
                PaperProps={{
                    sx: {
                        width: "333px",
                        minHeight: "191px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "30px auto 30px auto",
                        width: "100%",
                    }}
                >
                    <FormControl fullWidth sx={{ borderRadius: 3, maxWidth: 300, bgcolor: "#f2eeee"}} error={showSelectError}>
                        <InputLabel id="storage-label">Välj lager</InputLabel>
                        <Select
                            labelId="storage-label"
                            id="storage"
                            onChange={handleChange}
                            label="Lager"
                            value={chosenCostCenter}
                            sx={{
                                borderRadius: 3,
                                boxShadow: 4
                            }}
                        >
                            {costCenters.map(costCenter => {
                                return (
                                    <MenuItem key={costCenter} value={costCenter}>{costCenter}</MenuItem>
                                );
                            })}
                        </Select>
                        <SmallButton
                            
                            text="Välj" 
                            bgColor="#DEFFDF"
                            onClick={handleSubmit}
                        />
                    </FormControl>
                </Box>
            </Dialog>
        </>
    )
}
export default ChooseStorageDialog;