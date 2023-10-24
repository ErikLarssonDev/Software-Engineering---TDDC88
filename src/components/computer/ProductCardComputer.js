import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import { selected as selectedAtom, storage as storageAtom } from '../../recoil/atoms';
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import SmallButton from "../SmallButton";

import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

const paracetamolData = [
    {
        name: 'Mars',
        lagersaldo: 1397,
        pv: 1098,
        amt: 989,
    },
    {
        name: 'April',
        lagersaldo: 1480,
        pv: 1200,
        amt: 1228,
    },
    {
        name: 'Maj',
        lagersaldo: 1520,
        pv: 1108,
        amt: 1100,
    },
    {
        name: 'Juni',
        lagersaldo: 1400,
        pv: 680,
        amt: 1700,
    },
    {
        name: 'Juli',
        lagersaldo: 1400,
        pv: 680,
        amt: 1700,
    },
    {
        name: 'Augusti',
        lagersaldo: 1400,
        pv: 680,
        amt: 1700,
    },
];
const naproxenData = [
    {
        name: 'Mars',
        lagersaldo: 200,
        pv: 1098,
        amt: 989,
    },
    {
        name: 'April',
        lagersaldo: 804,
        pv: 1200,
        amt: 1228,
    },
    {
        name: 'Maj',
        lagersaldo: 1600,
        pv: 1108,
        amt: 1100,
    },
    {
        name: 'Juni',
        lagersaldo: 1010,
        pv: 680,
        amt: 1700,
    },
    {
        name: 'Juli',
        lagersaldo: 1377,
        pv: 680,
        amt: 1700,
    },
    {
        name: 'Augusti',
        lagersaldo: 100,
        pv: 680,
        amt: 1700,
    },
];


const ProductCardComputer = ({ text }) => {
    const [isShown, setIsShown] = useState(false);


    const handleClick = (id) => {
        if (id === "1") {
            setIsShown(true);
        } else {
            setIsShown(false);

        }
    };

    /*
        This function decrements and decrements the counter for the amount of Boxes added
      */

    return (
        <Box display={"flex"} marginTop={5}>

            <Box
                sx={{
                    width: '50%',
                    alignItems: 'center'
                }}>
                <Box>
                    <Card sx={{
                        width: '70%',
                        borderRadius: '12px',
                        border: 1,
                        borderColor: '#D0D4D9',
                        boxShadow: 4,
                        marginLeft: '130px',
                    }}>
                        <CardContent sx={{ px: 4.6, mb: -3, mt: 0 }}>
                            <Grid>
                                <Box display={"flex"}>
                                    <Box width={'50%'}>
                                        <Typography sx={{ fontFamily: "Montserrat " }} variant="h5" component="div">
                                            Paracetamol
                                        </Typography>
                                        <Typography sx={{ mt: -0.5, fontWeight: 400, fontSize: 16, fontFamily: "Montserrat " }} color="black">
                                            12345
                                        </Typography>
                                        <Typography sx={{ fontWeight: 300, fontSize: 16 }} variant="body2">
                                            Lager 2 {'>'} 1
                                            <br />
                                            <Grid sx={{ mx: 1.5 }}> Saldo: 750
                                            </Grid>
                                        </Typography>
                                    </Box>
                                    <Box marginLeft={'150px'} width={'100%'} display={'flex'} flexDirection={'column'} >
                                        {!isShown && (<SmallButton text="Visa graf" bgColor="#CFE7FC" onClick={() => handleClick("1")} />)}
                                    </Box>
                                </Box>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card sx={{
                        width: '70%',
                        borderRadius: '12px',
                        border: 1,
                        borderColor: '#D0D4D9',
                        boxShadow: 4,
                        marginLeft: '130px',
                    }}>
                        <CardContent sx={{ px: 4.6, mb: -3, mt: 0 }}>
                            <Grid>
                                <Box display={"flex"}>
                                    <Box width={'50%'}>
                                        <Typography sx={{ fontFamily: "Montserrat " }} variant="h5" component="div">
                                            Naproxen
                                        </Typography>
                                        <Typography sx={{ mt: -0.5, fontWeight: 400, fontSize: 16, fontFamily: "Montserrat " }} color="black">
                                            33333
                                        </Typography>
                                        <Typography sx={{ fontWeight: 300, fontSize: 16 }} variant="body2">
                                            Lager 2 {'>'} 5
                                            <br />
                                            <Grid sx={{ mx: 1.5 }}> Saldo: 1060
                                            </Grid>
                                        </Typography>
                                    </Box>
                                    <Box marginLeft={'150px'} width={'100%'} display={'flex'} flexDirection={'column'} >
                                        {isShown && (<SmallButton text="Visa graf" bgColor="#CFE7FC" onClick={() => handleClick("2")} />)}
                                    </Box>
                                </Box>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Box sx={{ width: '50%' }} display={"flex"}>

                {isShown && (<ComposedChart
                    width={750}
                    height={600}
                    data={paracetamolData}
                    margin={{
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" scale="band" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="lagersaldo" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="lagersaldo" stroke="#ff7300" />
                </ComposedChart>)}

                {!isShown && (<ComposedChart
                    width={750}
                    height={600}
                    data={naproxenData}
                    margin={{
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" scale="band" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="lagersaldo" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="lagersaldo" stroke="#ff7300" />
                </ComposedChart>)}

            </Box>

        </Box>

    );
};

export default ProductCardComputer;


/*<CardContent sx={{ px: 4.6, mb: -3, mt: 0 }}>
                        {articles.map(article => <Grid>
                            <Typography sx={{ fontFamily: "Montserrat " }} variant="h5" component="div">
                                {article.name}
                            </Typography>
                            <Typography sx={{ mt: -0.5, fontWeight: 400, fontSize: 16, fontFamily: "Montserrat " }} color="black">
                                {article.lioNr}
                            </Typography>
                            <Typography sx={{ fontWeight: 300, fontSize: 16 }} variant="body2">
                            Lager {article.storageId} {'>'} {article.placement}
                                <br />
                                <Grid sx={{ mx: 1.5 }}>
                                    Saldo: {(article.quantity)}
                                </Grid>
                            </Typography>

                            <Link to="/edit-auto-order" style={{ textDecoration: 'none' }}>
                                <Button size="medium"
                                    onClick={() => handleClick(article)}
                                    sx={{
                                        ml: 26, mt: -10,
                                        borderRadius: '12px',

                                        color: 'black',
                                        backgroundColor: "#CFE7FC",
                                    }}

                                >Visa graf 

                                </Button>
                            </Link>


                        </Grid>)}
                    </CardContent>*/
