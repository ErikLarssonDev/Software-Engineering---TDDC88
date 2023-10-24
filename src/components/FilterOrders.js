import * as React from 'react'

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from '@mui/material/DialogTitle';
import List from "@mui/material/List"
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

 /**
 * @returns Filter dialog for the orders based on their current status.
 * @param {open} param0 A state prop that triggers the success dialog to show.
 * @param {close} param1 A state prop that triggers the success dialog to hide.
 */

 /*
 This component corresponds to view 10.2 and is triggered in view 10 (OrderPage) 
 */

const FilterOrders = ({open, close}) => {

    const formStyle = {
        width: '90%',
        margin: 'auto',
        //maybe change color later, don't know if there is a standard
        backgroundColor: '#f2f2f2',
        borderRadius: '12px',
        marginBottom: '5px',
        textAlign: 'center',

    };
    const TextStyle = {
        display: 'inline-block',
        margin:'0 auto',
    };
    const QuantityStyle = {
        float: 'right',
        color:  '#737373',
    };

    //Constant numbers, should be replaced when backend is working
    const [finished, delivered, ongoing, delayed] = [1, 10, 5, 0]

  return (
    <Dialog open={open}>
            <DialogTitle sx={{textAlign: 'center', fontWeight: 'bold'}}>
                Status
            </DialogTitle>
            {/*Material-ui is not used since it was impossible to get the checkboxes to have a different
            background color than the background color of the parent */}
            <List style={{minWidth: 320, minHeight: 200}}>
                <ListItem style={formStyle}>
                    <input type='checkbox' />
                    <span style={TextStyle}>Slutförda</span>
                    <span style={QuantityStyle}>{finished}</span>
                </ListItem>
                <ListItem style={formStyle}>
                    <input type='checkbox' />
                    <span style={TextStyle}>Levererade</span>
                    <span style={QuantityStyle}>{delivered}</span>
                </ListItem>
                <ListItem style={formStyle}>
                    <input type='checkbox' />
                    <span style={TextStyle}>Pågående</span>
                    <span style={QuantityStyle}>{ongoing}</span>
                </ListItem>
                <ListItem style={formStyle}>
                    <input type='checkbox' />
                    <span style={TextStyle}>Försenade</span>
                    <span style={QuantityStyle}>{delayed}</span>
                </ListItem>
                <ListItem>
                    {/*The button components are deliberately not used since they are either too big or
                    too small */}
                    <Button onClick={close} variant="contained" sx={{backgroundColor: "#CFE7FC", width: "80%",
                     margin: "auto", color: "black", textTransform: "none", height: "50px",
                     borderRadius: "12px", marginTop: "15px", marginBottom: "15px"}}>
                        <Typography variant="h6" fontWeight={200}>Filtrera</Typography>
                    </Button>
                </ListItem>
            </List>
        </Dialog>
    )
}
export default FilterOrders;