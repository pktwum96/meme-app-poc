import Grid from "@mui/material/Grid";
import { Meme } from "../data/memes";
import MemeCard from "./MemeCard";

function MemeList({ memes }: { memes: Meme[] }) {
  return (
    <Grid
      container
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 1, md: 3 }}
      flexWrap="wrap"
    >
      {memes.map((meme, index) => (
        <Grid xs={2} sm={4} md={2} lg={1} item key={index + meme.id}>
          <MemeCard {...meme} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MemeList;
