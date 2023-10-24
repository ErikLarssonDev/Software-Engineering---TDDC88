import * as React from 'react'
import {Paper, Typography, Button} from "@mui/material"


const PrintArticle = ({name, lio, shelf, compartment, quantity, central}) => {

    const paperStyle = {
        paddingLeft: "30px",
        marginTop: '20px',
        paddingTop: "20px",
        paddingRight: '30px',
        borderRadius: '12px',
        height: '200px',
    }

    const spanStyle = {
        mb: '1.5',
        fontWeight: '400',
        fontSize: '20px',
        marginTop: '15px',
    }
    const container = {
        width: "50%",
        display: "inline",
        float: "left"
    }

    const btnStyle = {
        backgroundColor: '#CFE7FC',
        color: 'black',
        float: 'right',
        textTransform: "none",
        fontSize: "16px",
    }

    return(
        <Paper elevation={1} style={paperStyle}>
            <Typography sx={{ mb: 1.5, fontWeight: 400, fontSize: 30}}>
                {name}
            </Typography>
            <span style={spanStyle}>LIO-nummer: {lio}</span>
            <br />
            <span style={spanStyle}>Lager A > Hylla {shelf} > Fack {compartment} </span>
            <br />
            <div style={container}>
                <i style={{marginTop: "15px", fontSize: "20px", marginLeft:"20px"}}>Lagersaldo: {quantity}</i>
                <br />
                <i style={{fontSize: "20px", marginLeft:"20px"}}>Centrallagersaldo: {central}</i>
            </div>
                <Button variant="contained" style={btnStyle}>Skriv ut artikeletikett</Button>
           
            
        </Paper>
    )
}

export default PrintArticle;