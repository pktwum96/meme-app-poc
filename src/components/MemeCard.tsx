import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Meme } from "../supabase/types";
import VideoPreviewer from "./VideoPreviewer";

function MemeCard(meme: Meme) {
  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <Box position={"relative"} maxHeight={"285px"}>
        {meme.media_type?.includes("video") ? (
          <VideoPreviewer url={meme.media_url} />
        ) : (
          <CardMedia src={meme.media_url} />
        )}
        <CardActions sx={{ position: "absolute", top: 0, right: "0.5rem" }}>
          <IconButton sx={{ color: "white" }} aria-label="share">
            <ShareTwoToneIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }} aria-label="download">
            <DownloadIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }} aria-label="favourite">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Box>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography
          variant="h5"
          component="div"
          noWrap
          textOverflow={"ellipsis"}
        >
          {meme.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MemeCard;
