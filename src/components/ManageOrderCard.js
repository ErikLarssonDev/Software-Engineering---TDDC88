import React from "react";
import Box from "@mui/material/Box";
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import ExtraSmallButton from "../components/ExtraSmallButton";
import { WarningRounded } from "@mui/icons-material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import ConfirmDialog from "./ConfirmDialog";
import { articleNewStorage as articleAtom } from '../recoil/atoms';
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add';
import SuccessDialog from "./SuccessDialog";
import { useNavigate } from "react-router-dom"
import { selectedOrder as orderAtom } from '../recoil/atoms'
import { changeQuantity } from "../utils/orders";

/**
 * @param {article} param0, The articleInfo of the selected article.
 * @param {compartment} param1, The comparmentInfo of the selected article.
 * @param {storageId} param2, The storageId of the whole order, ex. "A".
 * @returns The content to be used in card in orderPage.
 */


const ManageOrderCard = ({
    article,
    compartment,
    storageId,
    articleInfo
}) => {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false)
    const [articleToAssignStorage, setArticleToAssignStorage] = useRecoilState(articleAtom);
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useRecoilState(orderAtom);

    const handleSuccessDialog = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
            navigate("/manage-order");
        }, 2000);
    };

    /* The default is now a storage that is not full */
    const handleAssignSpot = () => {
        if (1 != 1 /*storage is full*/) {
            handleSuccessDialog();
        } else /*assign item to a location in storage */ {
            setArticleToAssignStorage({ "name": articleInfo.name, "lioNr": articleInfo.lioNr, "quantity": compartment.quantity })
            navigate("/manage-inventory")
        }
    }

    /* Just temporary setting show dialog to false */
    const buttonClick = (btnText) => {
        if (btnText === "Packa upp") {
            setShowDialog(true)
        }
        else if (btnText === "Tilldela plats") {
            handleAssignSpot();
        }
        else { setShowDialog(false) }
    }

    const unpackArticle = () => {
        var newArticles = (order.articles.filter((temp) => {
            var newCompartments = (temp.articleInfo.compartments.filter((temp2) => {
                return (temp2.placement !== compartment.placement);
            }))
            setOrder({ ...order, articles: [{ ...article, articleInfo: { ...articleInfo, compartments: newCompartments } }] })
        }))
    }

    // Change the quantity of the selected article, with the difference between original quantity and count.
    const handleUnpack = () => {
        if (articlesLeftCount === count) {
            unpackArticle()
        }
        setArticlesLeftCount(articlesLeftCount - count)
        setCount(articlesLeftCount - count)
        changeQuantity((order.id + "/articles/" + articleInfo.lioNr), compartment.quantity - count)
    }
    var inventoryIcon;
    var inventoryText;
    var buttonText;

    /* Icons and different text if product has a location or not. */

    if (((compartment.placement) && (compartment.storageId)) === null) {
        inventoryIcon = (
            <WarningRounded
                sx={{ color: "#FFB266", fontSize: "26px" }}
            ></WarningRounded>)
        inventoryText = "Lagerplats saknas!"
        buttonText = "Tilldela plats"
    } else {
        inventoryText = "Lager " + storageId + " > Hylla " + compartment.storageId + " > " + compartment.placement
        buttonText = "Packa upp"
    }
    /* This function increments and increments the counter for the articles */
    const increment = () => {
        if (count < articlesLeftCount)
            setCount(count + 1)
        else {
            return
        }
    };
    /* This function decrements and decrements the counter for the articles */
    const decrement = () => {
        if (count > 0)
            setCount(count - 1)
        else {
            return
        }
    }
    // The constant that keeps track of the quantity of the selected article is left to unpack.
    const [articlesLeftCount, setArticlesLeftCount] = useState(compartment.quantity)
    // The constant that keeps track of the users input of how much to unpack of the selected article.
    const [count, setCount] = useState(articlesLeftCount);
    if (articlesLeftCount !== 0)
        return (
            <>
                <CardContent sx={{ px: 2 }}>
                    <Typography sx={{ fontFamily: "Montserrat", mt: -1 }} variant="h5" component="div">
                        {articleInfo.name}
                    </Typography>
                    <Box display={"flex"} flexDirection={"row"}>
                        <Box>
                            <Typography sx={{ fontWeight: 300, fontSize: 16 }} variant="body2">
                                LIO: {articleInfo.lioNr}
                                <br />
                                {articlesLeftCount} lådor
                            </Typography>
                        </Box>
                        <Box>
                            <Box ml={16} mr={-5} mt={-1}>
                                <ExtraSmallButton
                                    text={buttonText}
                                    onClick={() => buttonClick(buttonText)}
                                    bgColor="rgba(63, 142, 252, 0.15)"
                                />
                            </Box>
                        </Box>

                    </Box>
                    <Grid container spacing={0} sx={{ mt: 0, color: 'text.primary' }}>
                        <Grid >
                            {inventoryIcon}
                        </Grid>
                        <Grid sx={{ mx: 1.5, mt: 0.2, ml: 0.4, mb: 1 }}>
                            <Typography>
                                {inventoryText}
                            </Typography>
                        </Grid>
                    </Grid>
                    <hr
                        style={{
                            color: "black",
                            marginTop: "-2px",
                            marginBottom: "-12px"
                        }}
                    />
                </CardContent>
                <SuccessDialog message="Fullt i lager, skapa nya platser i dator." open={open} failiure={true} />
                <ConfirmDialog
                    message="Bekräfta uppackning?"
                    open={showDialog}
                    onClose={() => setShowDialog(false)}
                    onConfirm={handleUnpack}
                    targetPage="/manage-order"
                    successMessage="Artikel påfylld"
                    dispComponent={
                        <Box sx={{ padding: '15px' }} align="center">
                            <Typography sx={{
                                fontSize: "32px",
                                fontWeight: 400,
                                textAlign: "center",
                                wordBreak: "break-word",
                                width: "263.54px",
                            }}
                                align="center">
                                Lådor:
                            </Typography>
                            <Box marginTop="2">
                                <Tooltip sx={{ position: 'center' }}>
                                    <Button sx={{

                                        borderRadius: '4px',
                                        width: 30,
                                        heigth: 30,
                                        color: 'black',
                                        backgroundColor: "#FFFFFF",
                                        border: 1,
                                        borderColor: "#D0D4D9"

                                    }} onClick={decrement}>
                                        <RemoveIcon></RemoveIcon>
                                    </Button>
                                </Tooltip>

                                <Button sx={{
                                    color: 'black',
                                    backgroundColor: "#FFFFFF",
                                    fontSize: 30
                                }}>
                                    {count}
                                </Button>

                                <Tooltip>

                                    <Button sx={{
                                        borderRadius: '4px',
                                        width: 30,
                                        heigth: 30,
                                        color: 'black',
                                        backgroundColor: "#FFFFFF",
                                        border: 1,
                                        borderColor: "#D0D4D9"
                                    }} onClick={increment}>
                                        <AddIcon></AddIcon>
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>
                    }
                />
            </>
        );
};
export default ManageOrderCard; 