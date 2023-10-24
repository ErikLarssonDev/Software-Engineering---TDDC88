import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import { Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ReportIcon from "@mui/icons-material/Report";
import { selected as selectedAtom , selectedSearch as selectedSearchAtom, search as searchAtom} from '../recoil/atoms';
import { useRecoilState, useRecoilValue } from "recoil";
import { remaining } from "../utils/cart";
import { useLocation} from "react-router-dom";
import { red } from "@mui/material/colors";


/*
A part of the product specifcation, displays the counter for how many boxes are selected
*/

  

const ProductSpecificationCard = ({ text }) => {

    const [selected, setSelected] = useRecoilState(selectedAtom);
    const [selectedSearch, setSelectedSearch] = useRecoilState(selectedSearchAtom);
    const path = useLocation().pathname
    const search = useRecoilValue(searchAtom)
    const [highQuantity, setHighQuantity] = useState(false)

    const Increment = () => {
        setCount(count + 1);
        if (search) {
            if (count > selectedSearch.quantity - 1 && !highQuantity){
                setHighQuantity(true)
            }
            setSelectedSearch({ ...selectedSearch, amount: selectedSearch.amount + 1  })

        } else {
            if(count > selected.quantity - 1 && !highQuantity) {
                setHighQuantity(true)
            }
            setSelected({ ...selected, amount: selected.amount + 1 })
        }
};
    /*
        This function decrements and decrements the counter for the amount of Boxes added
      */
    const Decrement = () => {
        if (search) {
            if (selectedSearch.amount > selectedSearch.quantity + 1) {
                setCount(count - 1);
                setSelectedSearch({ ...selectedSearch, amount: selectedSearch.amount - 1, remaining: selectedSearch.remaining + 1 })
            } else if (selectedSearch.amount > 0 && highQuantity) {
                setHighQuantity(false)
                setCount(count - 1);
                setSelectedSearch({ ...selectedSearch, amount: selectedSearch.amount - 1, remaining: selectedSearch.remaining + 1 })
            } else if(selectedSearch.amount > 0) {
                setCount(count - 1);
                setSelectedSearch({ ...selectedSearch, amount: selectedSearch.amount - 1, remaining: selectedSearch.remaining + 1 })
            } else {
                setCount(0)
            }
        } 
        else {
            if(selected.amount > selected.quantity + 1) {
                setCount(count - 1);
                setSelected({ ...selected, amount: selected.amount - 1, remaining: selected.remaining + 1 })
            } else if (selected.amount > 0 && highQuantity) {
                setHighQuantity(false)
                setCount(count - 1)
                setSelected({ ...selected, amount: selected.amount - 1, remaining: selected.remaining + 1 })
            } else if (selected.amount > 0) {
                setCount(count - 1)
                setSelected({ ...selected, amount: selected.amount - 1, remaining: selected.remaining + 1 })
            }
            else {
                setCount(0);
            }
    }
    }

    const [count, setCount] = useState(0);
    return (

        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            
            sx={{
                marginTop: 4,
                boxShadow: 3,
                borderRadius: 2,
                width: '90%',
                minWidth: 310,
                height: 120,
                backgroundColor: '#FFFFFF',
            }}
          
          >
            <Typography sx={{ fontFamily: "Montserrat ", fontWeight: 400, fontSize: 26, marginBottom: 2 }} align="center" variant="h5" component="div" marginTop={"8px"}>
                {text}
            </Typography>
            <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}>

                <Grid container spacing={2} alignItems="center" display={"flex"}>
                    <Grid>
                        <Tooltip title="Ta bort">
                            <Button sx={{

                                width: '20px',
                                color: 'black',
                                backgroundColor: "#FFFFF",
                                borderColor: "#D0D4D9",
                                border: 1,

                            }}
                                onClick={Decrement}>
                                <RemoveIcon></RemoveIcon>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid>

                        <Button sx={{
                            color: 'black',
                            backgroundColor: "#FFFFFF",
                            fontSize: 30
                        }} >
                            {search ? selectedSearch.amount : selected.amount}
                        </Button>
                    </Grid>

                    <Grid>

                        <Tooltip title="Lägg till">

                            <Button  sx={{
                                 width: '20px',
                                 color: 'black',
                                 backgroundColor: "#FFFFF",
                                 borderColor: "#D0D4D9",
                                 border: 1,
                            }}

                                onClick={Increment}>
                                <AddIcon></AddIcon>
                            </Button>
                        </Tooltip>
                    </Grid>

                </Grid>
            </Box>
            {highQuantity ? <Typography display={"flex"} alignItems={"center"} color={"#d32f2f"} marginBottom={"8px"}>
                  <ReportIcon />  Antalet överskrider saldo  </Typography>: null}
        </Box>
    );
};

export default ProductSpecificationCard;