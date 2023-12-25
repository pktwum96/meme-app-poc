import { Box, Link, Typography } from "@mui/material";
import { Meme } from "../data/memes";
import MemeList from "./MemeList";

function HomeCategoriesSection({
  sectionTitle,
  memeList,
}: {
  sectionTitle: string;
  seeMoreUrl?: string;
  memeList: Meme[];
}) {
  return (
    <Box
      sx={{
        paddingY: 3,
      }}
    >
      <Box
        paddingY={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" component="div">
          {sectionTitle}
        </Typography>
        <Link
          component="button"
          variant="body1"
          underline="hover"
          onClick={() => {
            alert("WIP");
          }}
        >
          See More
        </Link>
      </Box>
      <MemeList memes={memeList} />
    </Box>
  );
}

export default HomeCategoriesSection;
