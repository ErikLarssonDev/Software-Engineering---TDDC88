import React from "react";
import { Button, Typography } from "@mui/material";
import articles from "../data/articles.json";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { search as searchAtom, selected as selectedAtom, selectedCompartment as selectedCompartmentAtom, selectedSearch as selectedSearchAtom} from '../recoil/atoms';
import { remaining, displayRemaining,displayRemainingSearch } from "../utils/cart";
import { useRecoilState } from "recoil";
/*
A part of the product specifcation, reviews details about the scanned article

*/


const ScannedArticleCard = () => {

    /*
    These functions control the "show more" arrow and it's content 
    */
    const ExpandMore = styled((props) => { 
        const { expand, ...other } = props;
        return <ExpandMoreIcon {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const search = useRecoilValue(searchAtom);
    const selectedSearch = useRecoilValue(selectedSearchAtom)
    const selectedCompartment = useRecoilValue(selectedCompartmentAtom);

    const handleExpandClick = () => {
        setExpanded(!expanded)

    };

    const resetCount = () => {
        setSelected({...selected, amount: selected.amount - selected.amount})
    };

    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useRecoilState(selectedAtom);
    const selectedArticle = useRecoilValue(selectedAtom);


   
    

    return (

       
            <Card sx={{
                marginTop:4,
                borderRadius: '12px',
                border: 1,
                borderColor: '#D0D4D9',
                boxShadow: 4,
                width: "90%",
                minWidth: 310,
        }}>
            <CardContent sx={{ px: 4.6 }}>
                <Typography sx={{ fontWeight: 400, fontSize: 26 }} align="center" variant="h5" component="div">
                    {search ? "Sökt Artikel" : "Skannad Artikel"}
                </Typography>
            
                <Typography sx={{ mt: 2.5, mb: 1.5, fontWeight: 400, fontSize: 20}} color="black">
                    {search ? selectedSearch.name : selected.article.name} 
                </Typography>
                <Typography sx={{ fontWeight: 300, fontSize: 14 }} variant="body2" color="black">
                    LIO-nummer: {search ? selectedSearch.lioNr : selected.article.lioNr}
                </Typography>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent >
                        <Typography style={{ fontWeight: 300, fontSize: 16 }} variant="body2" >
                            Lager {search ? selectedCompartment.storageId : selectedArticle.storageId} {'>'} {search ? selectedCompartment.placement : selectedArticle.placement}
                            </Typography>
                        <Grid container direction ="row" alignItems="center">
                            <Grid>
                            <WarningIcon sx={{color:"orange"}}></WarningIcon>
                            </Grid>
                            <Grid sx={{mx: 1.5}}>
                              
                                Saldo: {search ? displayRemainingSearch(selectedSearch) : displayRemaining(selectedArticle)} 
                            
                            </Grid>
                            
                        </Grid>
                        <Typography style={{ fontWeight: 300, fontSize: 16 }} variant="body2" >
                        </Typography>
                        <Typography style={{ fontWeight: 300, fontSize: 16, fontStyle: 'italic' }} variant="body2">
                            Nästa leverans: {}
                            <br>
                            </br>
                            Antal: {} 
                        </Typography>
                    </CardContent>
                </Collapse>

                    <Grid container spacing={0} sx={{ mt: 2 }}>
                        <Grid >
                            <Button sx={{
                                borderRadius: '10px',
                                width: 100,
                                heigth: 34,
                                color: 'black',
                                backgroundColor: "#FFFFFF",
                                textTransform: 'none'
                            }}
                                onClick={handleExpandClick}
                            >

                                <Typography style={{ fontWeight: 400, fontSize: 14 }}  >Se mer</Typography>
                                <ExpandMore sx={{mx:-0.1}}
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon></ExpandMoreIcon>
                                </ExpandMore>


                            </Button>

                        </Grid>
                        <Grid sx={{ mx: 0.3, mt: 0.2 }}>
                            <Link to="/adjust-inventory" style={{ textDecoration: 'none' }}>
                                <Button onClick={resetCount} sx={{
                                    borderRadius: '10px',
                                    width: 131,
                                    heigth: 34,
                                    color: 'black',
                                    backgroundColor: "#CFE7FC",
                                    textTransform: 'none'
                                }} size="medium">
                                    <Typography style={{ fontWeight: 400, fontSize: 13 }}  >Justera lagersaldo</Typography>
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
  

    );
};
export default ScannedArticleCard;