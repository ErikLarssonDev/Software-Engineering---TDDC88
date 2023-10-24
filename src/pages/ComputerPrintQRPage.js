import * as React from "react";
import {Box, Grid, MenuItem, Select, FormControl, InputLabel, Button,
    Paper, } from "@mui/material"
import {Add} from "@mui/icons-material"
import AddButton from "../components/AddButton"
import CreateQR from "../components/CreateQR"
import ComputerArticleList from "../components/ComputerArticleList";
import { fetchArticleName, fetchAllArticles } from "../utils/articles";
import { selected as selectedAtom } from '../recoil/atoms'
import { useRecoilState } from "recoil";
import NavBarComputer from "../components/NavBarComputer";
import PrintArticle from "../components/ComputerPrintArticle";
import ConnectArticle from "../components/ComputerConnectArticle";


const ComputerPrintQRPage = () => {

    const [storage, setStorage] = React.useState('');
    const [selected, setSelected] = useRecoilState(selectedAtom);
    const [activeElement, setActiveElement] = React.useState(-1);

    /*Values hardcoded because the articles cannot be loaded from the backend */
    const article0 = {id:0, name:"Alvedon", shelf:4, compartment:13, quantity:200,
        lio:123456, central:1000}
    const article1 = {id:1, name:null, shelf:4, compartment:9, quantity:null,
        lio:null, central: null}
    const article2 = {id:2, name:"Rabiesvaccin", shelf:6, compartment:3, quantity:2,
        lio:234567, central:14}
    const article3 = {id:3, name:"Latexhandskar", shelf:10, compartment:11, quantity:543,
        lio:345678, central:10785}
    const articleArray = [article0, article1, article2, article3]

    const updateActiveElement = (id) => {
        setActiveElement(activeElement !== id ? id : -1);
    }

    const getArticles = async () => {
        const articles = await fetchAllArticles()
        setSelected(articles);
    }
    React.useEffect(() => {
        getArticles()
    }, []);

    const menuStyle = {
        fontWeight: "bold",
        borderRadius: '12px',
        boxShadow: "2",

    }
    const formControlStyle = {
        width: "60%",
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: "2",
    }

    const handleChange = (e) => {
        setStorage(e.target.value)
    }

    const leftGridStyle = {
        paddingLeft: "5%",
        paddingTop: "50px"
    }
    const rightGridStyle = {
        paddingRight: "5%",
    }

    const AddBtnStyle = {
        backgroundColor: "white",
        color: "black",
        borderRadius: '12px',
        height: "55px",
        width: "55px",
        float: "right",

    }

    const paperStyle = {
        marginTop: '30px',
        borderRadius: '12px',
    }

    return(
        <Box>
            <NavBarComputer />
            <Grid container spacing={4}>
                { /*Left container */}
                <Grid item xs={6} style={leftGridStyle}>
                    <FormControl style={formControlStyle}>
                        <InputLabel id="select-storage-label">Välj lager</InputLabel>
                        <Select
                            labelId="select-storage-label"
                            id="select-storage"
                            value={storage}
                            label="Storage"
                            onChange={handleChange}
                            style={menuStyle}>
                            <MenuItem value={1}>Lager A</MenuItem>
                            <MenuItem value={2}>Lager B</MenuItem>
                            <MenuItem value={3}>Lager C</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" style={AddBtnStyle} onClick={()=>getArticles()}>
                        <Add />
                    </Button>
                    <CreateQR />
                    <Paper style={paperStyle}>
                        {/*Values hardcoded because the backend function to get all articles doesn't work */}
                        <ComputerArticleList shelf={article0.shelf} compartment={article0.compartment}
                         name={article0.name} quantity={article0.quantity} 
                         isActive={0 == activeElement} onClick={() => updateActiveElement(0)} />

                        <ComputerArticleList shelf={article1.shelf} compartment={article1.compartment}
                         name={article1.name} quantity={article1.quantity} 
                        isActive={1 == activeElement} onClick={() => updateActiveElement(1)} />

                        <ComputerArticleList shelf={article2.shelf} compartment={article3.compartment}
                        name={article2.name} quantity={article2.quantity}
                        isActive={2 == activeElement} onClick={() => updateActiveElement(2)} />

                        <ComputerArticleList shelf={article3.shelf} compartment={article3.compartment}
                        name={article3.name} quantity={article3.quantity}
                        isActive={3 == activeElement} onClick={() => updateActiveElement(3)} />
                    </Paper>
                </Grid>
                { /*Right container */}
                <Grid item xs={6} style={rightGridStyle}>
                    {(() => {
                        if (activeElement == -1) {
                            return
                        } else {
                            const art = articleArray[activeElement]
                            if (art.name) {
                                return <PrintArticle name={art.name} lio={art.lio} shelf={art.shelf}
                                    compartment={art.compartment} quantity={art.quantity}
                                    central={art.central} />
                            }
                            else {
                                return <ConnectArticle />
                            }
                            
                        }
                    })()
                    }
                </Grid>
            </Grid>

        </Box>
    );
};

export default ComputerPrintQRPage;