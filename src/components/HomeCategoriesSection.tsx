import { Box, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Meme } from "../supabase/types";
import MemeList from "./MemeList";

function HomeCategoriesSection({
  sectionTitle,
  memeList,
}: {
  sectionTitle: string;
  seeMoreUrl?: string;
  memeList: Meme[];
}) {
  const navigate = useNavigate();
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
            navigate("/search?query=");
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
