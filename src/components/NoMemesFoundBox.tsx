import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { ContainedButton } from "./ContainedButton";
import { Text } from "./Text";

export const NoMemesFoundBox = () => {
  const navigate = useNavigate();

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Text gutterBottom variant="h5" component="div">
          🚨404: Meme Not Found
        </Text>
        <Text variant="body2" sx={{ color: "text.secondary" }}>
          We couldn’t find the meme you’re looking for. But don’t worry, we’ve
          got options for you:
        </Text>
        <Text variant="body2" sx={{ color: "text.secondary" }}>
          <li>
            <strong>Upload It</strong>: Got the meme? Share it with the world
          </li>
          <li>
            <strong>Request It</strong>: Let us know, and we’ll track it down
            and add it to our collection.
          </li>
        </Text>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around" }}>
        <ContainedButton
          size="small"
          color="primary"
          onClick={() => navigate("/meme/create")}
        >
          Upload It
        </ContainedButton>
        <ContainedButton
          size="small"
          color="primary"
          onClick={() => navigate("/meme/request")}
        >
          Request it
        </ContainedButton>
      </CardActions>
    </Card>
  );
};
