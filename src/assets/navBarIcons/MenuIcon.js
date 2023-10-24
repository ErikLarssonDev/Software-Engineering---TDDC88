import React from "react";
import { Link } from "react-router-dom";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';

/**
 * 
 * @returns The MenuIcon component which is displayed on view S2, S10, S11, S12, S13.
 */

const MenuIcon = () => {

    const [state, setState] = React.useState(false)

    const toggleDrawer = (open) => (event) => {
        setState(open)
    }

    return (
        <div>
            <Link>
                <MenuRoundedIcon sx={{ fontSize: "60px", color: "black"}} onClick={toggleDrawer(true)} />
            </Link>
            <Drawer
                anchor={'left'}
                open={state}
                onClose={toggleDrawer(false)}
            >
            <MenuRoundedIcon sx={{ fontSize: "60px", color: "black", mt: 2, ml: 1.5}} onClick={toggleDrawer(false)} />
                <MenuList>
                    <Link to="/home-inventory" style={{ textDecoration: "none", color: 'black'}}>
                        <MenuItem>Hem</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/order" style={{ textDecoration: "none", color: 'black'}}>
                        <MenuItem>Beställningar</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/auto-order" style={{ textDecoration: "none", color: 'black'}}>
                        <MenuItem>Autobeställningar</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/manual-order" style={{ textDecoration: "none", color: 'black'}}>
                        <MenuItem>Manuell beställning</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/manage-inventory" style={{ textDecoration: "none", color: 'black'}}>
                        <MenuItem>Hantera lager</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/new-storage" style={{ textDecoration: "none", color: 'black'}}>
                        <MenuItem>Flytta mellan lager</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/scan-article" style={{ textDecoration: "none", color: 'black'}}>
                        <MenuItem>Skanna för uttag</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/search-articles" style={{ textDecoration: "none", color: 'black'}}>
                        <MenuItem>Sök artikel</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/checkout-cart" style={{ textDecoration: "none", color: 'black'}}>
                        <MenuItem>Varukorg</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/login" style={{ textDecoration: "none", color: 'black'}} onClick={() => sessionStorage.clear()}>
                        <MenuItem>Logga ut</MenuItem>
                    </Link>
                </MenuList>
            </Drawer>
        </div>
    );
};

export default MenuIcon;
