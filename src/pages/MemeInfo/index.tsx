import { Delete, Edit } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { ContainedButton } from "../../components/ContainedButton";
import { MediaRenderer } from "../../components/MediaRenderer";
import { ResponsiveIconButton } from "../../components/ResponsiveIconButton";
import Text from "../../components/Text";
import { useFullScreenLoading } from "../../contexts/loading";
import { getMemeById } from "../../queries/memes";
import { Meme } from "../../supabase/types";
import { useUser } from "../../supabase/useUser";

export const MemeInfoPage = () => {
  const { memeId } = useParams();
  const state = useLocation().state;

  const { userDetails } = useUser();

  const stateMeme = state?.meme;
  const [meme, setMeme] = useState<Meme | undefined>(stateMeme);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const fetchMeme = async () => {
      setIsLoading(true);
      try {
        if (!meme && memeId) {
          const { data, error } = await getMemeById(supabaseClient, memeId);
          if (error) {
            throw new Error(error.message);
          }

          setMeme(data);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error((error as any).message);
      }
    };
    fetchMeme();
    setIsLoading(false);
  }, [memeId]);

  const isCreatedByUser = meme?.created_by === userDetails?.id;

  const { setIsLoading } = useFullScreenLoading();
  if (!meme) {
    return "Meme not found";
  }
  return (
    <Container>
      {isCreatedByUser ? (
        <Stack direction="row" paddingY={1} alignItems={"center"}>
          <Chip label={meme.status.toLocaleUpperCase()} size="small" />
          <Stack direction="row" spacing={1} marginLeft={"auto"}>
            <ResponsiveIconButton
              label={"Delete"}
              icon={<Delete />}
              color="error"
              size="small"
            />
            <ResponsiveIconButton label={"Edit"} icon={<Edit />} size="small" />
          </Stack>
        </Stack>
      ) : null}
      <Text variant="h5">{meme?.title}</Text>

      <MediaRenderer type={meme.media_type!} src={meme.media_url!} />
      <Text variant="body1">{meme?.description}</Text>

      {isCreatedByUser && meme.status === "draft" ? (
        <Box padding={2} display={"flex"}>
          <ContainedButton sx={{ marginLeft: "auto" }}>
            Submit for review
          </ContainedButton>
        </Box>
      ) : null}
    </Container>
  );
};
