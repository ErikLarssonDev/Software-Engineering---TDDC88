import React from "react";
import { Box, Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

/**
 * This implements the searchBar design which is used througout the application 
 */

const SearchBar = ( { text } ) => {
  return (
    <Box marginTop={3} marginBottom={3}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 300,
              borderRadius: '12px',
              border: 1,
              borderColor: '#D0D4D9',
              boxShadow: 0,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={text}

            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
  );
};

export default SearchBar;