import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { WarningRounded, Check, Clear } from "@mui/icons-material";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selected as selectedAtom , selectedCompartment as selectedCompartmentAtom, selectedSearch as selectedSearchAtom} from '../recoil/atoms';
import { useRecoilState } from "recoil";

/**
 * @param {productName} param0 The name of the product placed in the cart.
 * @param {lioNum} param1 The LIO number of the selected product.
 * @param {stockName} param2 The name of the stock the selected product is located at. Ex. the 'A' in "Lager A".
 * @param {shelfNum} param3 The number of the shelf the selected product is located at. Ex. the '1' in  "Hylla 1".
 * @param {compartmentNum} param4 The number of the compartment the selected product is located at. Ex. the '18' in  "Fack 18".
 * @param {stockBalance} param5 The balance of the selected product in that storage.
 * @param {levDate} param6 The date of the next delivery of the product.
 * @param {levBalance} param7 The balance to be delivered at the @param levDate
 * @var {balanceIcon} var0 The icon placed next to the balance, depends on the balance.
 * @var {balancePlural} var1 The if balance should be written in plural or not.
 * @returns The cards for Search result.
 */

/* This function makes the icon turn around when expanded and vice versa */

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginRight: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SearchResultCard = ({
  name,
  lioNr,
  compartment
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [selectedSearch, setSelectedSearch] = useRecoilState(selectedSearchAtom);
  const selectedArticle = useRecoilValue(selectedAtom);
  const [selectedCompartment, setSelectedCompartment] = useRecoilState(selectedCompartmentAtom);
  

  const resetCount = () => {
  
    setSelectedSearch({...selectedSearch, lioNr: lioNr, name: name})
    setSelectedCompartment(compartment);
  };

  var balanceIcon;
  var balancePlural;
  /* Different icons for different stock balances,   */

  if (compartment.quantity === 0) {
    balanceIcon = <Clear sx={{ color: "Red", fontSize: "29px" }}></Clear>;
    balancePlural = "kartonger";
  } else if (compartment.quantity === 1) {
    balanceIcon = (
      <WarningRounded
        sx={{ color: "#FFB266", fontSize: "29px" }}
      ></WarningRounded>
    );
    balancePlural = "st";
  } else {
    balanceIcon = (
      <Check sx={{ color: "lightgreen", fontSize: "29px" }}></Check>
    );
    balancePlural = "st";
  }
  return (
    < Card
      sx={{
        marginTop: 4,
        borderRadius: '12px',
        border: 1,
        borderColor: '#D0D4D9',
        boxShadow: 4,
        width: "90%",
        minWidth: 310,
      }
      }
    >
      <CardContent
        sx={{ px: 4 }}
      >
        <Box sx={{}} display={"flex"} alignItems={"right"} mb={2}>
          <Box display={"flex"} flexDirection={"column"} mr={-1}>
            <Typography
              sx={{
                mt: 2,
                fontSize: 24,
                fontFamily: "Montserrat",
              }}
            >{name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontSize: "16px",
              }}
              variant="body2"
            >LIO-nummer: {lioNr}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontSize: "16px",
              }}
              variant="body2"
            >
              Lager: {compartment.storageId} {' < '} {compartment.placement}

            </Typography>

            <Grid container spacing={0} sx={{ mt: 1, color: "text.primary" }}>
              <Grid>{balanceIcon}</Grid>
              <Grid sx={{ mx: 1.5, mt: 0.6, ml: 1 }}>
                <Typography>
                  Saldo: {compartment.quantity} {balancePlural}
                </Typography>
              </Grid>
            </Grid>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                }}
                variant="body2"
              >
                Nästa leverans:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                }}
                variant="body2"
              >
                Antal: {compartment.quantity} {"st"}
              </Typography>
            </Collapse>
          </Box>
        </Box>

        <Grid container spacing={0} >
          <Grid >
            <Button sx={{
              borderRadius: '10px',
              width: 100,
              heigth: 30,
              color: 'black',
              backgroundColor: "#FFFFFF",
              textTransform: 'none'
            }}
              onClick={handleExpand}
            >

              <Typography style={{ fontWeight: 400, fontSize: 14 }}  >Se mer</Typography>
              <ExpandMore sx={{ mx: -0.1 }}
                expand={expanded}
                onClick={handleExpand}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon></ExpandMoreIcon>
              </ExpandMore>


            </Button>

          </Grid>
          <Grid sx={{ mx: 0.3, mt: 1.2 }}>
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

export default SearchResultCard;
