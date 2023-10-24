import * as React from 'react'
import {Menu, MenuItem, Divider} from "@mui/material"
import { Link } from "react-router-dom";


/**
 * This component corresponds to view 10.5 on Figma
 * @param {open} param0 A state prop that triggers the dropdown menu to show.
 * @param {close} param1 A state prop that triggers the dropdown menu to hide.
 * @param {anchor} param2 The element where the dropdown menu will be anchored (drop down from)
 * @returns the add order-menu on OrderPage
 */

const AddOrder = ({open, close, anchor}) => {

    return (
        <Menu open={open} onClose={close} anchorEl={anchor}
            sx={{
                borderRadius: "12px",
            }}>
                <MenuItem component={Link} to="/manual-order" onClick={close}>
                    Gör manuell beställning
                </MenuItem>

                <Divider />

                <MenuItem component={Link} to="/auto-order" onClick={close}>
                    Automatiska beställningar
                </MenuItem>
        </Menu>
    )
};
export default AddOrder;