import Tune from '@mui/icons-material/Tune';
import React from "react";
import { Link } from "react-router-dom";

/**
 * 
 * @returns The TuneIcon which is displayed on the searchBar component in view S10.
 */

const SearchBarTuneIcon = () => {
    return (
        <Link>
            <Tune sx={{ fontSize: "40px", color: "black", rotate: "90deg" }} />
        </Link>
    );
};

export default SearchBarTuneIcon;