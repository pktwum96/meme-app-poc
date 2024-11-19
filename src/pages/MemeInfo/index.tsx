import { Delete, Edit } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
import {
  isMemeDraft,
  isMemeRejected,
  retrieveLanguageFromList,
} from "../../helpers/utils";
import {
  deleteMeme,
  getMemeById,
  submitMemeForReview,
} from "../../queries/memes";
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

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

  const onDeleteConfirm = async () => {
    setIsLoading(true);

    try {
      if (meme) {
        const { error } = await deleteMeme(supabaseClient, meme);

        if (error) {
          throw new Error(error.message);
        }

        navigate("/my-memes");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error((error as Error).message);
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
          <Stack
            direction={{ xs: "column", md: "row" }}
            paddingBottom={"1.5rem"}
          >
            <Text fontWeight={theme.typography.fontWeightBold} variant="h5">
              {meme?.title}
            </Text>
            <Stack
              direction="row"
              alignItems={"center"}
              marginLeft={{ md: "auto" }}
              marginTop={{ md: 0, xs: 2 }}
            >
              <StatusChip
                status={meme.status}
                label={meme.status.toLocaleUpperCase()}
                size="small"
              />
              {isMemeDraft(meme) || isMemeRejected(meme) ? (
                <Stack
                  direction="row"
                  spacing={1}
                  paddingLeft={1}
                  marginLeft={"auto"}
                >
                  <ResponsiveIconButton
                    label={"Delete"}
                    icon={<Delete />}
                    onClick={handleClickOpen}
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
          </Stack>
        ) : null}

        <MediaRenderer
          alt={meme.title}
          type={meme.media_type!}
          src={meme.media_url!}
        />
        <Text sx={{ paddingY: "1rem" }} variant="body1">
          {meme?.description}
        </Text>

        {meme.tags?.length ? (
          <Stack paddingBottom={"1rem"} direction={"row"}>
            {meme.tags?.map((tag) => {
              return (
                <Chip key={tag} sx={{ marginRight: 1 }} label={`# ${tag}`} />
              );
            })}
          </Stack>
        ) : null}

        <Divider />

        <Stack
          py={1}
          gap={{ me: 4, xs: 1 }}
          direction={{ md: "row", xs: "column" }}
        >
          {meme.characters?.length ? (
            <Box display={"flex"} alignItems={"center"}>
              <PeopleAltIcon sx={{ margin: 1 }} fontSize="small" />

              {meme.characters.map((char) => char.name).join(", ")}
            </Box>
          ) : null}
          {meme.languages?.length ? (
            <Box display={"flex"} alignItems={"center"}>
              <LanguageIcon sx={{ margin: 1 }} fontSize="small" />

              {meme.languages.map((langCode, index, array) => {
                const languageText =
                  retrieveLanguageFromList(langCode)?.name || langCode;
                return (
                  <Typography
                    key={languageText}
                    variant="body2"
                    paddingRight={1}
                  >
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

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Draft?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this meme? This is not reversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Go Back
          </Button>
          <Button color="error" onClick={onDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
