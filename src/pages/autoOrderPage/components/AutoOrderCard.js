import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";




const AutoOrderCard = ({ article, handleClick }) => {
    

    return (
        <Grid>
            <Typography sx={{ fontFamily: "Montserrat " }} variant="h5" component="div">
                {article.name}
            </Typography>
            <Typography sx={{ mt: -0.5, fontWeight: 400, fontSize: 16, fontFamily: "Montserrat " }} color="black">
                {article.lioNr}
            </Typography>
            <Typography sx={{ fontWeight: 300, fontSize: 16 }} variant="body2">
                Beställningspunkt: {article.orderQuantityLevel}
                <br />
                Beställningsmängd: {article.normalOrderQuantity}
            </Typography>

            <Link to="/edit-auto-order" style={{ textDecoration: 'none' }}>
            <Button size="medium"
                onClick={() => handleClick(article)}
                sx={{
                    ml: 26, mt: -10,
                    borderRadius: '12px',
                    width: 70,
                    color: 'black',
                    backgroundColor: "#CFE7FC",
                }}

            >Ändra

            </Button>
            </Link>

            <Divider sx={{ mt: -2, mb: 0 }} />
        </Grid>
    )
}

export default AutoOrderCard