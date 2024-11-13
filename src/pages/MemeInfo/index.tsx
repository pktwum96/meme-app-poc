import { Delete, Edit } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { merge } from "lodash";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ContainedButton } from "../../components/ContainedButton";
import { MediaRenderer } from "../../components/MediaRenderer";
import { ResponsiveIconButton } from "../../components/ResponsiveIconButton";
import { StatusChip } from "../../components/StatusChip";
import Text from "../../components/Text";
import { useFullScreenLoading } from "../../contexts/loading";
import { useTheme } from "../../contexts/theme";
import { isMemeDraft, retrieveLanguageFromList } from "../../helpers/utils";
import { getMemeById, submitMemeForReview } from "../../queries/memes";
import { MemeWithTags } from "../../supabase/types";
import { useUser } from "../../supabase/useUser";

export const MemeInfoPage = () => {
  const { memeId } = useParams();
  const state = useLocation().state;

  const { userDetails } = useUser();

  const stateMeme = state?.meme;
  const [meme, setMeme] = useState<MemeWithTags | undefined>(stateMeme);
  const { supabaseClient } = useSessionContext();
  const { setIsLoading } = useFullScreenLoading();

  const { theme } = useTheme();
  useEffect(() => {
    const fetchMeme = async () => {
      setIsLoading(true);
      try {
        if (!meme && memeId) {
          const { data, error } = await getMemeById(supabaseClient, memeId);

          if (error) {
            throw new Error(error.message);
          }

          if (data) {
            const memeData = {
              ...data,
              tags: data.tags.map((tag: { name: string }) => tag.name),
            };
            setMeme(memeData);
          }
        }
      } catch (error) {
        setIsLoading(false);
        toast.error((error as Error).message);
      }
    };
    fetchMeme();
    setIsLoading(false);
  }, [memeId, meme, setIsLoading, supabaseClient]);

  const navigate = useNavigate();

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

        setMeme(merge(meme, updatedMeme));
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
      <Card sx={{ p: "1.5rem" }}>
        {isCreatedByUser ? (
          <Stack direction="row" paddingBottom={"1.5rem"} alignItems={"center"}>
            <Text fontWeight={theme.typography.fontWeightBold} variant="h5">
              {meme?.title}
            </Text>
            <StatusChip
              status={meme.status}
              label={meme.status.toLocaleUpperCase()}
              size="small"
              sx={{ mx: 1 }}
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
                  onClick={() => navigate(`/meme/${memeId}/edit`)}
                  label={"Edit"}
                  icon={<Edit />}
                  size="small"
                />
              </Stack>
            ) : null}
          </Stack>
        ) : null}

        <MediaRenderer
          alt={meme.title}
          type={meme.media_type!}
          src={meme.media_url!}
        />
        <Text sx={{ padding: "1rem" }} variant="body1">
          {meme?.description}
        </Text>

        {meme.tags?.length ? (
          <Stack paddingBottom={"1rem"} direction={"row"}>
            {meme.tags?.map((tag) => {
              return <Chip key={tag} label={`# ${tag}`} />;
            })}
          </Stack>
        ) : null}

        <Divider />

        <Stack>
          {meme.languages?.length ? (
            <Box display={"flex"} alignItems={"center"}>
              <LanguageIcon sx={{ margin: 1 }} fontSize="small" />

              {meme.languages.map((langCode, index, array) => {
                const languageText =
                  retrieveLanguageFromList(langCode)?.name || "";
                return (
                  <Typography variant="body2" paddingRight={1}>
                    {languageText}
                    {index !== array.length - 1 ? ", " : ""}
                  </Typography>
                );
              })}
            </Box>
          ) : null}
        </Stack>

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
      </Card>
    </Container>
  );
};
