import * as React from 'react';
import Box from '@mui/material/Box';
import Header from "../components/Header";
import ChangeInventoryButton from './ChangeInventoryButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";

const MivNavBar = () => {

  const buttonstyle = {
    color: "black",
    fontSize: "19px",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontStyle: "normal",
    textTransform: "capitalize",
  }

  const [anchorElOrder, setAnchorElOrder] = React.useState(null);
  const openOrder = Boolean(anchorElOrder);

  const [anchorElInventory, setAnchorElInventory] = React.useState(null);
  const openInventory = Boolean(anchorElInventory);

  const [anchorElEconomy, setAnchorElEconomy] = React.useState(null);
  const openEconomy = Boolean(anchorElEconomy);


  return (
    <Box sx={{paddingTop: "10px"}}>
        <ChangeInventoryButton/>
        <Header/>
        <Box height="50px" minWidth={850} display={"flex"} justifyContent={"space-between"} alignItems={'center'} marginLeft={10} marginRight={10}
        sx = {{
            backgroundColor: "white",
            border: 1,
            borderRadius: "12px",
            borderColor: '#D0D4D9',
            boxShadow: 4,
            mt: "25px",
            paddingLeft: "30px",
            paddingRight: "30px"
        }}
        >

        <div>
        <Button
            id="basic-button"
            aria-controls={openOrder ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openOrder ? 'true' : undefined}
            onClick={(event) =>
              setAnchorElOrder(event.currentTarget)
            }
            sx={buttonstyle}
        >
            Beställningar
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorElOrder}
            open={openOrder}
            onClose={() => setAnchorElOrder(null)}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            sx={{margin: 0}}
        >
            <MenuList dense sx={{padding: 0, minWidth: 140}}>
                <Link to="" style={{ textDecoration: "none" }}>
                <MenuItem onClick={() => setAnchorElOrder(null)} sx={{margin: -1, color: "black"}}>Beställningar</MenuItem>
                <Divider/>
                </Link>
                <Link to="" style={{ textDecoration: "none" }}>
                <MenuItem onClick={() => setAnchorElOrder(null)} sx={{margin: -1, color: "black"}}>Autobeställning</MenuItem>
                <Divider/>
                </Link>
                <Link to="" style={{ textDecoration: "none" }}>
                <MenuItem onClick={() => setAnchorElOrder(null)} sx={{margin: -1, color: "black"}}>Manuell beställning</MenuItem>
                </Link>
            </MenuList>
        </Menu>
        </div>

        <div>
        <Button
            id="basic-button"
            aria-controls={openInventory ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openInventory ? 'true' : undefined}
            onClick={(event) => setAnchorElInventory(event.currentTarget)}
            sx={buttonstyle}
        >
            Hantera Lager
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorElInventory}
            open={openInventory}
            onClose={() => setAnchorElInventory(null)}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            sx={{margin: 0}}
        >
            <MenuList dense sx={{padding: 0, minWidth: 140}}>
                <Link to="" style={{ textDecoration: "none" }}>
                <MenuItem onClick={() => setAnchorElInventory(null)} sx={{margin: -1, color: "black"}}>Hantera lager</MenuItem>
                <Divider/>
                </Link>
                <Link to="" style={{ textDecoration: "none" }}>
                <MenuItem onClick={() => setAnchorElInventory(null)} sx={{margin: -1, color: "black"}}>Flytta artiklar</MenuItem>
                </Link>
            </MenuList>
        </Menu>
        </div>
        
        <div>
        <Button
            sx={buttonstyle}
        >
            Uttag av artiklar
        </Button>
        </div>

        <div>
        <Button
            sx={buttonstyle}
        >
            Sök artikel
        </Button>
        </div>

        <div>
        <Button
            id="basic-button"
            aria-controls={openEconomy ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openEconomy ? 'true' : undefined}
            onClick={(event) => setAnchorElEconomy(event.currentTarget)}
            sx={buttonstyle}
        >
            Ekonomi
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorElEconomy}
            open={openEconomy}
            onClose={() => setAnchorElEconomy(null)}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            sx={{margin: 0}}
        >
            <MenuList dense sx={{padding: 0, minWidth: 140}}>
                <Link to="" style={{ textDecoration: "none" }}>
                <MenuItem onClick={() => setAnchorElEconomy(null)} sx={{margin: -1, color: "black"}}>Historik</MenuItem>
                <Divider/>
                </Link>
                <Link to="" style={{ textDecoration: "none" }}>
                <MenuItem onClick={() => setAnchorElEconomy(null)} sx={{margin: -1, color: "black"}}>Nuvarande lager</MenuItem>
                </Link>
            </MenuList>
        </Menu>
        </div>

        <div>
        <Button
            sx={buttonstyle}
        >
            Varukorg
        </Button>
        </div>
        </Box>
    </Box>
  );
}
export default MivNavBar;