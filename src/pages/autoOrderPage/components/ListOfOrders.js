import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import AutoOrderCard from "./AutoOrderCard";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selected as selectedAtom } from "../../../recoil/atoms";


/**
 * This implements the card containing all articles that has an normalOrderQuantity > 0 for the current storage. Displayed in view S12.
 * 
 */

const ListOfOrders = ({ onConfirm, articles }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [article, setArticle] = useRecoilState(selectedAtom);
  const navigate = useNavigate();


  const handleClick = (selectedArticle) => {
    setArticle(selectedArticle);
    navigate("/edit-auto-order");
  };

  return (
    <Box
      marginTop={2}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Card
        sx={{
          borderRadius: "12px",
          width: 350,
          border: 1,
          borderColor: "#D0D4D9",
          boxShadow: 4,
        }}
      >
        <CardContent sx={{ px: 4.6, mb: -3, mt: 0 }}>
          <Grid container direction="column" justifyContent="flex-start">
            {/* articles.map */}
            {articles.map((item) => {
                if (item.normalOrderQuantity >= 0){
              return <AutoOrderCard key={item.id} article={item} handleClick={handleClick}  />
              };
            })}

          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListOfOrders;
