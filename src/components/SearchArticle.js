import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import ReportIcon from "@mui/icons-material/Report";

/**
 *
 * @returns The search for article field where the user can search for an article using the LIO number or the article name. This search field can be used for view 3, 3.1, 3.1.1, 7, 7.1, 7.1.1, 8, and 8.1.
 * @param1 { icon }, an icon that will be displayed at the right edge of the search field.
 * @param2 { onSearch }, an function that handles the search.
 * @param3 { error }, the error message that should be displayed if the search function fails. 
 *
 */

const SearchArticle = ({ icon, onSearch, error }) => {
  const [searchedArticle, setSearchedArticle] = useState("");

  
 

  /**
   * Handles the search when the user presses 'enter'. Fetches the searched article,
   * either by LIO number or article name. If the searched article doesn't exist an
   * error message is shown.
   */
  const handleSearch = async () => {
    onSearch(searchedArticle); //TODO: Should probably also return a specific error message
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        sx={{ backgroundColor: "white", minWidth: "300px", width: "90%" }}
        id="article-search"
        error={error !== ""}
        label="Sök efter artikel..."
        onChange={(e) => {
          setSearchedArticle(e.target.value);
        }}
        value={searchedArticle}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            handleSearch();
            ev.preventDefault();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>{icon}</IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* If the LIO number is invalid */}
      {error !== "" && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "5px" }}>
          <Typography
            sx={{
              color: "red",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ReportIcon sx={{ mr: "5px" }} />
            {error}
          </Typography>{" "}
        </Box>
      )}
    </Box>
  );
};

export default SearchArticle;
