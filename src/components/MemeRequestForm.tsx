import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export const MemeRequestForm = () => {
  const [memeTitle, setMemeTitle] = useState("");
  const [memeDetails, setMemeDetails] = useState("");

  const handleSubmit = () => {
    setMemeTitle("");
    setMemeDetails("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      method="POST"
      data-netlify="true"
      name="Meme Upload Requests"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Request a Meme Upload
      </Typography>

      <TextField
        label="Meme Title or Description"
        variant="outlined"
        fullWidth
        name="Meme Title"
        required
        value={memeTitle}
        onChange={(e) => setMemeTitle(e.target.value)}
      />

      <TextField
        label="Additional Details (Optional)"
        variant="outlined"
        fullWidth
        multiline
        name="Additional Details"
        rows={4}
        value={memeDetails}
        onChange={(e) => setMemeDetails(e.target.value)}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Request
      </Button>
    </Box>
  );
};
