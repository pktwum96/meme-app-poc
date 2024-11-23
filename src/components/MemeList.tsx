import Grid from "@mui/material/Grid";
import { Meme } from "../supabase/types";
import { MemeCard } from "./MemeCard";

export function MemeList({ memes }: { memes: Meme[] }) {
  return (
    <Grid container spacing={2}>
      {memes.map((meme, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={6}
          md={4}
          lg={2.4} // To handle 5 columns on large screens
        >
          <MemeCard {...meme} />
        </Grid>
      ))}
    </Grid>
  );
}
