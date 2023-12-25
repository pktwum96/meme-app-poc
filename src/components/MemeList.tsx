import Grid from "@mui/material/Grid";
import { Meme } from "../data/memes";
import MemeCard from "./MemeCard";

function MemeList({ memes }: { memes: Meme[] }) {
  return (
    <Grid
      container
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 4, sm: 2, md: 4 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      flexWrap="wrap"
    >
      {memes.map((meme, index) => (
        <Grid xs={2} sm={4} md={4} item key={index + meme.id}>
          <MemeCard {...meme} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MemeList;
