import * as React from "react";
import {Paper, Typography, TextField, Button} from "@mui/material";
import { flexbox } from "@mui/system";


const CreateQR = () => {

    const paperStyle = {
        marginTop: "20px",
        paddingLeft: "30px",
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
        marginRight: '10px',
    }

    const textFieldStyle = {
        borderRadius: '12px',
        width: '15%',
        marginRight: '25px',
        verticalAlign: 'middle',
    }

    const rowContainer = {
        height: '60px',
        verticalAlign: 'middle',
    }

    const btnStyle = {
        backgroundColor: '#CFE7FC',
        color: 'black',
        float: 'right',
        textTransform: "none",
        height: '100%',
        fontSize: "16px",
    }

    return (
        <Paper elevation={1} style={paperStyle}>
            <Typography sx={{ mb: 1.5, fontWeight: 400, fontSize: 30}}>
                Skapa ny plats i lager
            </Typography>
            <div style={rowContainer}>
                <span style={spanStyle}>
                    Hylla:
                </span>
                <TextField id="shelf" label="Hylla..." variant="outlined" style={textFieldStyle} />
                <span style={spanStyle}>
                    Fack:
                </span>
                <TextField id="shelf" label="Fack..." variant="outlined" style={textFieldStyle} />
                <Button variant="contained" style={btnStyle}>Skriv ut QR</Button>
            </div>
        </Paper>
    );
}

export default CreateQR;