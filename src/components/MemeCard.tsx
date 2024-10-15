import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Meme } from "../supabase/types";
import { MediaRenderer } from "./MediaRenderer";

function MemeCard(meme: Meme) {
  const navigate = useNavigate();
  const onCardClick = () => {
    navigate(`/meme/${meme.id}`, { state: { meme } });
  };
  return (
    <CardActionArea onClick={onCardClick}>
      <Card
        sx={{
          width: "100%",
        }}
      >
        <Box position={"relative"} maxHeight={"285px"}>
          <MediaRenderer type={meme.media_type!} src={meme.media_url} />
          <CardActions sx={{ position: "absolute", top: 0, right: "0.5rem" }}>
            <IconButton
              component={"span"}
              sx={{ color: "white" }}
              aria-label="share"
            >
              <ShareTwoToneIcon />
            </IconButton>
            <IconButton
              component={"span"}
              sx={{ color: "white" }}
              aria-label="download"
            >
              <DownloadIcon />
            </IconButton>
            <IconButton
              component={"span"}
              sx={{ color: "white" }}
              aria-label="favourite"
            >
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Box>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography
            variant="h6"
            component="div"
            noWrap
            textOverflow={"ellipsis"}
          >
            {meme.title}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

export default MemeCard;
