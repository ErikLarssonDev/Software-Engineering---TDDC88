import * as React from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import PlusIcon from "../assets/navBarIcons/RoundedAddIcon";
import MenuIcon from "../assets/navBarIcons/MenuIcon";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, Typography } from "@mui/material";
import SearchBarTuneIcon from "../assets/searchBarIcons/SearchBarTuneIcon";
import ExtraSmallButton from "../components/ExtraSmallButton";
import ManageOrderCard from "../components/ManageOrderCard";
import UnpackAllCard from "../components/UnpackAllCard";
import { useRecoilState } from 'recoil';
import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import { format, parseISO } from 'date-fns'
import { changeQuantity } from "../utils/orders";
import { articlesToUnpack as unpackArticleAtom } from "../recoil/atoms";
import { selectedOrder as orderAtom } from '../recoil/atoms'
/**
 * @returns The page for manage-order.
 */

const ManageOrderPage = () => {
    /*The selected order stored in a atom*/
    const [order, setOrder] = useRecoilState(orderAtom)
    /*The article information of the articles to unpack stored in a atom*/
    const [articlesToUnpack, setArticlesToUnpack] = useRecoilState(unpackArticleAtom)
    const [showDialog, setShowDialog] = useState(false);
    const buttonClick = () => {
        setShowDialog(true)
    }
    const unPackAll = () => {
        var newArticles = (order.articles.filter((temp) => {
            return !articlesToUnpack.some((arts) => {
                return temp.articleInfo.lioNr === arts.articleInfo.lioNr;
            })
        }))
        setOrder({ ...order, articles: newArticles })
        order.articles.map(article =>
            changeQuantity((order.id + "/articles/" + article.articleInfo.lioNr + "/articleInfo"), 0)
        )
        setArticlesToUnpack([])
    }
    return (
        <Box>
            <NavBar
                leftIcon={<MenuIcon />}
                rightIcon={
                    <PlusIcon />
                }
            />
            <Typography
                sx={{
                    fontSize: "32px",
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "39px",
                    mb: 2,
                }}
            >Beställningar
            </Typography>
            <Box
                marginTop={2}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Card sx={{
                    borderRadius: '12px',
                    minWidth: 350,
                    border: 1,
                    borderColor: '#D0D4D9',
                    boxShadow: 4,
                    mb: -1
                }}>
                    <CardContent sx={{
                        px: 4.6,
                        mb: -2
                    }}>
                        <Typography sx={{
                            mb: 1.5,
                            fontWeight: 400,
                            fontSize: 16,
                            fontFamily: "Montserrat "
                        }} color="black">
                            Beställnings ID: {order.id}
                        </Typography>
                        <Typography sx={{
                            fontWeight: 300,
                            fontSize: 16
                        }} variant="body2">
                            {/* Formating date from ISO-standard into dd/MM-yyyy*/}
                            Beställningsdatum: {format(parseISO((order.orderDate)), "dd/MM-yyyy")}
                            <br />
                            Beräknad leverans: {format(parseISO((order.estimatedDeliveryDate)), "dd/MM-yyyy")}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{
                        justifyContent: "center"
                    }}>
                        <ExtraSmallButton
                            text="Packa upp hela beställningen"
                            bgColor="rgba(63, 142, 252, 0.15)"
                            onClick={() => buttonClick()}
                        />
                    </CardActions>
                </Card>
            </Box>
            <SearchBar icon={<SearchBarTuneIcon />} text={"Sök efter artikel"} />
            <Box
                marginTop={2}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}>
                <Card sx={{
                    width: 350,
                    borderColor: '#D0D4D9',
                    boxShadow: 4,
                }}>{/*For all articles in a order map article. For each article map the info inside the array and put info inside a card. (ManageOrderPage cards)*/}
                    {order.articles.map(article => {
                        return (
                            (article.articleInfo.compartments).map(compartment => {
                                return <ManageOrderCard key={[compartment.placement, compartment.storageId]} article={article} compartment={compartment} storageId={order.storageId} articleInfo={article.articleInfo} />
                            }))
                    })}
                </Card>
            </Box>
            <ConfirmDialog
                message="Artiklar"
                open={showDialog}
                onClose={() => setShowDialog(false)}
                onConfirm={unPackAll}
                targetPage="/manage-order"
                successMessage="Artiklar påfyllda"
                defaultButtons={false}
                dispComponent={
                    <Box
                        flexDirection={"column"}
                        marginBottom={2}
                        display={"flex"}>{/*For all articles in a order map article. For each article map the info inside the array and put info inside a card. (Unpacking all view)*/}
                        {order.articles.map(article => {
                            return (
                                (article.articleInfo.compartments).map(compartment => {
                                    return <UnpackAllCard key={[compartment.placement, compartment.storageId]} articleInfo={article.articleInfo} compartment={compartment} article={article} />
                                }))
                        })}
                    </Box>
                }
            />
        </Box >
    );
};

export default ManageOrderPage;
