import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ChangeInventoryButton = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
        <Button
        variant="contained"
        size="small"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
            backgroundColor: "white",
            minWidth: "116.45px",
            height: "30px",
            textTransform: "none",
            borderRadius: "12px",
            ml: 10,
            color: "black",
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontStyle: "normal",
        }}
      >
        Lager A
        <KeyboardArrowDownIcon sx={{ml: 1}}/>
      </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            sx={{margin: 0}}
        >
            <MenuList dense sx={{padding: 0, minWidth: 115}}>
                <Link to="" style={{ textDecoration: "none" }}>
                <MenuItem onClick={handleClose} sx={{margin: -1, color: "black"}}>Lager A</MenuItem>
                <Divider/>
                </Link>
                <Link to="" style={{ textDecoration: "none" }}>
                <MenuItem onClick={handleClose} sx={{margin: -1, color: "black"}}>Lager B</MenuItem>
                <Divider/>
                </Link>
                <Link to="" style={{ textDecoration: "none" }}>
                <MenuItem onClick={handleClose} sx={{margin: -1, color: "black"}}>Lager C</MenuItem>
                </Link>
            </MenuList>
        </Menu>
        </div>
    );
}

export default ChangeInventoryButton;