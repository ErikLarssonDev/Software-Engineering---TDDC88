import * as React from "react"
import {Paper, Typography, TextField, Button} from "@mui/material"


const ConnectArticle = () => {

    const paperStyle = {
        marginTop: "20px",
        paddingLeft: "30px",
        paddingTop: "20px",
        paddingRight: '30px',
        borderRadius: '12px',
        height: '200px',
        marginRight: "10px",

    }
    const textFieldStyle = {
        width: "70%",
        float: "left"
    }
    const btnStyle = {
        backgroundColor: '#CFE7FC',
        color: 'black',
        float: 'right',
        textTransform: "none",
        height: "55px",
        fontSize: "16px",
    }
    
    return(
        <Paper elevation={1} style={paperStyle}>
             <Typography sx={{ mb: 1.5, fontWeight: 400, fontSize: 30}}>
                Koppla artikel
            </Typography>
            <TextField id="shelf" label="Sök efter artikel..." variant="outlined" style={textFieldStyle} />
            <Button variant="contained" style={btnStyle}>Koppla artikel</Button>

        </Paper>
    )
}
export default ConnectArticle