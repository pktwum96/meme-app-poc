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
import LoadingText from "../../components/LoadingText";
import { MediaRenderer } from "../../components/MediaRenderer";
import { ResponsiveIconButton } from "../../components/ResponsiveIconButton";
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
      try {
        if (!meme && memeId) {
          const { data, error } = await getMemeById(supabaseClient, memeId);
          if (error) {
            throw new Error(error.message);
          }

          setMeme(data);
        }
      } catch (error) {
        toast((error as any).message);
      }
    };
    fetchMeme();
  }, [memeId]);

  const isLoading = !meme;
  return (
    <Container>
      {meme?.created_by === userDetails?.id ? (
        <Stack direction="row" paddingY={1} alignItems={"center"}>
          <Chip label={meme?.status.toLocaleUpperCase()} size="small" />
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
      <LoadingText loading={isLoading} variant="h5">
        {meme?.title}
      </LoadingText>

      <MediaRenderer type={meme?.media_type!} src={meme?.media_url!} />
      <LoadingText loading={isLoading} variant="body1">
        {meme?.description}
      </LoadingText>

      <Box>
        <ContainedButton>Submit for review</ContainedButton>
      </Box>
    </Container>
  );
};
