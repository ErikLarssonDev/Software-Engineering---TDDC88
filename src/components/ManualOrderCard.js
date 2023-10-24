import React from "react";
import { Typography } from "@mui/material";
import articles from "../data/articles.json";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import WarningIcon from '@mui/icons-material/Warning';
import { useRecoilValue, useRecoilState } from "recoil";
import { remaining, displayRemaining, displayRemainingSearch } from "../utils/cart";


import {
    selected as selectedAtom, selectedArticle as selectedArticleAtom,
    search as searchAtom, selectedSearch as selectedSearchAtom, selectedCompartment as selectedCompartmentAtom
} from '../recoil/atoms';
/*
A part of the product specifcation, reviews details about the scanned article

*/

const ManualOrderCard = () => {
    const selectedArticle = useRecoilValue(selectedAtom);
    const search = useRecoilValue(searchAtom);
    const selectedSearch = useRecoilValue(selectedSearchAtom)
    const selectedCompartment = useRecoilValue(selectedCompartmentAtom);

    return (

        <Box
            marginTop={2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
        >
            <Card sx={{
                borderRadius: '12px',
                maxWidth: 360,
                border: 1,
                borderColor: '#D0D4D9',
                boxShadow: 4,

            }}>
                <CardContent sx={{ px: 4.6 }}>
                    <CardContent  >
                        <Typography sx={{ fontWeight: 400, fontSize: 32 }} align="center" variant="h5" component="div">
                            {search ? selectedSearch.name : selectedArticle.article.name}
                        </Typography>
                        <Typography sx={{ mt: 2.5, mb: 1.5, fontWeight: 400, fontSize: 24 }} color="black">
                            {selectedArticle.name}
                        </Typography>

                        <Typography sx={{ fontWeight: 300, fontSize: 16 }} variant="body2" color="black">
                            LIO-nummer: {search ? selectedSearch.lioNr : selectedArticle.article.lioNr}
                        </Typography>


                        <Typography style={{ fontWeight: 300, fontSize: 16 }} variant="body2" >
                            Lager {search ? selectedCompartment.storageId : selectedArticle.storageId} {'>'} {search ? selectedCompartment.placement : selectedArticle.placement}
                        </Typography>
                        <Grid container direction="row" alignItems="center">
                            <Grid>
                                <WarningIcon sx={{ color: "orange" }}></WarningIcon>
                            </Grid>
                            <Grid sx={{ mx: 1.5 }}>
                                Saldo: {search ? selectedCompartment.quantity : selectedArticle.quantity}

                            </Grid>

                        </Grid>
                        <Typography style={{ fontWeight: 300, fontSize: 16 }} variant="body2" >
                            Saldo i Centrallager: 100 Kartonger
                        </Typography>
                        <Typography style={{ fontWeight: 300, fontSize: 16, fontStyle: 'italic' }} variant="body2">
                            Nästa leverans: {articles[0].delivery_date}
                            <br>
                            </br>
                            Antal: 50 kartonger
                        </Typography>
                    </CardContent>
                </CardContent>
            </Card >
        </Box>

    );
};
export default ManualOrderCard;