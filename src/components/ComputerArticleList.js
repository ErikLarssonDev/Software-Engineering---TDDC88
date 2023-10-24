import * as React from "react";
import {Paper, Divider, Button} from "@mui/material"
import {Check} from "@mui/icons-material"


const ComputerArticleList = ({shelf, compartment, name, quantity, isActive, onClick}) => {

    const [isHovering, setIsHovering] = React.useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovering(false);
      };

    const divStyle = {
        height: "50px",
        fontSize: "20px",
        paddingTop: "30px",
        cursor: isHovering ? 'pointer' : '',
        backgroundColor: (() => {
            if (isHovering) {
                return '#f2f3f2'
            } else if (isActive) {
                return '#e6e6e5'
            } else if (!isActive) {
                return 'white'
            }
          })()
    }
    

    const left = {

    }
    const middle = {
        marginLeft: "25%",
    }
    const right = {
        float: "right",
        marginRight: "10px",
    }
    const leftContainer = {
        float: "left",
        display: "inline-block",
        width: "200px",
        textAlign: "left",
        marginLeft: "10px",
    }

    const btnStyle = {
        backgroundColor: '#ffc2b3',
        color: 'black',
        float: 'right',
        textTransform: "none",
        fontSize: "16px",
        marginRight: "10px",

    }

    return (
      <div>
        <div style={divStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            onClick={onClick}>
            <div style={leftContainer}><span style={left}>Hylla {shelf} > Fack {compartment}</span></div>
            <span style={middle}>{name}</span>
            {(()=> {
                if (!name && isActive) {
                    return <Button variant="contained" style={btnStyle}>Ta bort lagerplats</Button>
                } else {
                    return <span style={right}>{quantity} st    <Check sx={{ color: "lightgreen", fontSize: "20px" }}></Check></span>
                }
            })()}
            
        </div>
        <Divider />
      </div>
    );
}

export default ComputerArticleList;