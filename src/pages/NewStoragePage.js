import React from "react";
import { Box, Card, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import MenuIcon from "../assets/navBarIcons/MenuIcon";
import ModernQrScanner from "../components/ModernQrScanner";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selected as selectedAtom, allStorages as allStoragesAtom, storage as storageAtom } from '../recoil/atoms';
import { fetchArticle } from "../utils/articles";
import { fetchCompartment } from "../utils/compartments";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { fetchStorage, fetchAllStorages } from "../utils/storages";
import { useState, useEffect } from "react";
import SuccessDialog from "../components/SuccessDialog";


/**
 *
 * @returns The new storage page (view M1)
 */

const NewStoragePage = () => {

    const [selected, setSelected] = useRecoilState(selectedAtom);
    const [selectedStorages, setSelectedStorages] = useRecoilState(allStoragesAtom);
    const [selectedStorage, setSelectedStorage] = useRecoilState(storageAtom);
    const [showFailDialog, setShowFailDialog] = useState(false);
    const [storageSelected, setStorageSelected] = useState(false);
    const [chosenStorage, setChosenStorage] = useState('');
    const navigate = useNavigate();

    //useEffect --> get all storages and display in dropdown menu
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAllStorages();
            setSelectedStorages(result);
        }
        fetchData().catch(console.error);

    });

    //When an item is selected in dropdown menu
    const handleChange = async (event) => {
        setSelectedStorage(await fetchStorage(event.target.value));
        setChosenStorage(event.target.value);
        setStorageSelected(true);
    };

    const onScan = async (scannedData) => {

        if (scannedData) {
            if (storageSelected) {
                const queryRes = await fetchArticle(scannedData.data);

                var filteredCompartments = queryRes.compartments.filter((c) => {
                    return (c.qrCode.localeCompare(scannedData.data) == 0) ;                  
                  });

                if (queryRes) {
                    setSelected({ ...queryRes, compartments: filteredCompartments[0] });
                    navigate("/article-to-move");
                }
            } else {
                setShowFailDialog(true);
                setTimeout(() => {
                    setShowFailDialog(false);
                }, 1500);
            }
        }
    };

    return (
        <Box>
            <NavBar leftIcon={<MenuIcon />} />
            <ModernQrScanner onScan={onScan} />
            <Box sx={{ display: "flex", justifyContent: 'center' }}>
                <Card
                    sx={{
                        borderRadius: '12px',
                        maxWidth: 400,
                        minWidth: 270,
                        maxHeight: 90,
                        border: 1,
                        borderColor: '#D0D4D9',
                        boxShadow: 4,
                        mx: 3,
                        mt: 3,
                        mb: 3,
                        p: 1
                    }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Typography style={{ fontWeight: 400, fontSize: 18 }} >Välj nytt lager</Typography>
                        <FormControl fullWidth sx={{ borderRadius: 3, maxWidth: 100, bgcolor: "#f2eeee" }}>

                            <InputLabel id="demo-simple-select-label">Lager</InputLabel>
                            <Select
                                value={chosenStorage}
                                label="Lager"
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: 4
                                }}
                                IconComponent={ExpandMoreIcon}
                                onChange={handleChange}
                            >
                                {selectedStorages.map(storage => {
                                    return <MenuItem value={storage.id}>{storage.id}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Card>
            </Box>
            <SuccessDialog message="Välj lager" open={showFailDialog} failiure={true} />
        </Box >
    );
};

export default NewStoragePage;
