import React from "react";
import { Box } from "@mui/system";

/**
 * 
 * @returns The textbox telling the user what to do on the page, e.g. "Hantera lager" on view S13.
 */

const InstructionTextBox = ({ text }) => {
    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            <h1 style={{ margin: 0 }}>{text}</h1>
        </Box>
    );
};

export default InstructionTextBox;
