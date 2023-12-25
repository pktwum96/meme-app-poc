import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

function SearchJumbotron() {
  return (
    <Box
      style={{
        backgroundColor: `rgb(176,110,181)`,
        padding: "2.5rem",
        borderRadius: "15px",
        marginTop: "0.5rem",
        background: `linear-gradient(90deg, rgba(70,151,254,1) 0%, rgba(130,132,255,1) 100%)`,
      }}
    >
      <Box
        style={{
          maxWidth: "65rem",
          margin: "auto",
        }}
      >
        <Typography
          variant="h4"
          mb={3}
          align="center"
          color={"white"}
          gutterBottom
        >
          Unleash the Laughter! <br />
          Find that meme:
        </Typography>
        <SearchBar />
      </Box>
    </Box>
  );
}

export default SearchJumbotron;
