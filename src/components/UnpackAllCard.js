import * as React from "react";
import Checkbox from '@mui/material/Checkbox';
import { Box, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import { WarningRounded } from "@mui/icons-material";
import { articlesToUnpack as unpackArticleAtom } from "../recoil/atoms";
import { useRecoilState } from "recoil";

/**
 * @param {articleInfo} param0, The articleInfo of the selected article.
 * @param {compartment} param1, The comparmentInfo of the selected article.
 * @param {article} param2, The selected article.
 * @returns The cards used when unpacking all in the manageOrderPage.
 */

const UnpackallCard = ({
    articleInfo,
    compartment,
    article
}) => {
    /*A atom with an array containing the articleinformation for the articles to be unpacked*/
    const [articlesToUnpack, setArticlesToUnpack] = useRecoilState(unpackArticleAtom)
    /*Handle the selected checkbox and sets any selected article to be unpacked */
    const handleSelected = (event) => {
        if (event.target.checked) {
            setArticlesToUnpack(articlesToUnpack.concat(article))
        } else {
            setArticlesToUnpack(articlesToUnpack.filter((articleInfos) =>
                articleInfos.lioNr !== articleInfo.lioNr))
        }
    }
    const handleStorageStatus = () => {
        //If the article has no "Hylla" and "Fack", display a warning symbol and no edit-balance component.
        if (((compartment.placement) && (compartment.storageId)) === null) {
            return (
                <Box
                    display={"flex"}
                    sx={{
                    }}>
                    <WarningRounded
                        sx={{
                            color: "#FFB266",
                            fontSize: "25px",
                            ml: 1.2,
                            mr: 1.2,
                            mt: 1.2
                        }}>
                    </WarningRounded>
                    <Typography sx={{
                        fontWeight: 400,
                        mt: 1.4
                    }}>
                        {articleInfo.name}
                    </Typography>
                </Box>
            )
        }
        else {
            return (
                <>
                    <Typography sx={{
                        fontWeight: 400,
                    }}>
                        <Checkbox
                            sx={{
                                color: "#808080",
                                '&.Mui-checked': {
                                    color: "#808080",
                                },
                            }} onChange={handleSelected} />
                        {articleInfo.name}
                    </Typography>
                    <Box
                        display={"flex"}
                        flexDirection={"row"}
                        minWidth={"90px"}
                        sx={{
                            justifyContent: 'space-between'
                        }}>
                    </Box>
                </>
            )
        }
    }
    return (
        <Box
            marginTop={1}>
            <Card sx={{
                width: 300,
                minHeight: 50,
                backgroundColor: "#D9D9D926",
                px: "2px",
                py: "0px",
                boxShadow: 0
            }}>
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    sx={{
                        padding: '3px',
                        justifyContent: 'space-between'
                    }}
                >{handleStorageStatus()}
                </Box>
            </Card>
        </Box>
    )
}
export default UnpackallCard;