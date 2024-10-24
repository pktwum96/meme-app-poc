import { Delete, Edit } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ContainedButton } from "../../components/ContainedButton";
import { MediaRenderer } from "../../components/MediaRenderer";
import { ResponsiveIconButton } from "../../components/ResponsiveIconButton";
import { StatusChip } from "../../components/StatusChip";
import Text from "../../components/Text";
import { useFullScreenLoading } from "../../contexts/loading";
import { isMemeDraft } from "../../helpers/utils";
import { getMemeById, submitMemeForReview } from "../../queries/memes";
import { Meme } from "../../supabase/types";
import { useUser } from "../../supabase/useUser";

export const MemeInfoPage = () => {
  const { memeId } = useParams();
  const state = useLocation().state;

  const { userDetails } = useUser();

  const stateMeme = state?.meme;
  const [meme, setMeme] = useState<Meme | undefined>(stateMeme);
  const { supabaseClient } = useSessionContext();
  const { setIsLoading } = useFullScreenLoading();

  const navigate = useNavigate();

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
        toast.error((error as Error).message);
      }
    };
    fetchMeme();
    setIsLoading(false);
  }, [memeId, meme, setIsLoading, supabaseClient]);

  const isCreatedByUser = meme?.created_by === userDetails?.id;

  const onSubmitForReview = async () => {
    if (meme) {
      try {
        setIsLoading(true);
        const { error, data: updatedMeme } = await submitMemeForReview(
          supabaseClient,
          meme
        );

        if (error) {
          throw new Error(error.message);
        }

        setMeme(updatedMeme);
      } catch (error) {
        setIsLoading(false);
        toast.error((error as Error).message);
      }
    }

    setIsLoading(false);
  };
  if (!meme) {
    return "Meme not found";
  }
  return (
    <Container sx={{ paddingY: 3 }}>
      {isCreatedByUser ? (
        <Stack direction="row" paddingY={1} alignItems={"center"}>
          <StatusChip
            status={meme.status}
            label={meme.status.toLocaleUpperCase()}
            size="small"
          />
          {isMemeDraft(meme) ? (
            <Stack direction="row" spacing={1} marginLeft={"auto"}>
              <ResponsiveIconButton
                label={"Delete"}
                icon={<Delete />}
                color="error"
                size="small"
              />
              <ResponsiveIconButton
                label={"Edit"}
                icon={<Edit />}
                size="small"
              />
            </Stack>
          ) : null}
        </Stack>
      ) : null}
      <Text variant="h5">{meme?.title}</Text>

      <MediaRenderer type={meme.media_type!} src={meme.media_url!} />
      <Text variant="body1">{meme?.description}</Text>

      {isCreatedByUser && meme.status === "draft" ? (
        <Box padding={2} display={"flex"}>
          <ContainedButton
            sx={{ marginLeft: "auto" }}
            onClick={onSubmitForReview}
          >
            Submit for review
          </ContainedButton>
        </Box>
      ) : null}
    </Container>
  );
};
