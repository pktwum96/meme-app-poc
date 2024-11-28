import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { ContainedButton } from "../../components/ContainedButton";

export const RequestMemePage = () => {
  const [memeTitle, setMemeTitle] = useState("");
  const [memeDetails, setMemeDetails] = useState("");

  return (
    <Container maxWidth="xl" sx={{ paddingY: 4 }}>
      <Box
        component="form"
        method="POST"
        data-netlify="true"
        name="Meme Upload Requests"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Hidden input for Netlify to identify the form */}
        <input type="hidden" name="form-name" value="Meme Upload Requests" />
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

        <ContainedButton type="submit" fullWidth>
          Submit Request
        </ContainedButton>
      </Box>
    </Container>
  );
};
