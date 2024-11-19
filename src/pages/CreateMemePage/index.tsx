import { CloseOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CharacterSelector from "../../components/CharacterSelector";
import { ContainedButton } from "../../components/ContainedButton";
import FileUploadArea from "../../components/FileUploadArea";
import LanguageSelector from "../../components/LanguageSelector";
import { MediaRenderer } from "../../components/MediaRenderer";
import TagsSelector from "../../components/TagsSelector";
import Text from "../../components/Text";
import { useFullScreenLoading } from "../../contexts/loading";
import {
  createOrUpdateMemeInDatabase,
  uploadMemeToSupabase,
} from "../../queries/memes";
import { Meme, MemeWithTags } from "../../supabase/types";
import { useUser } from "../../supabase/useUser";

export const CreateMemePage = ({ meme }: { meme?: MemeWithTags }) => {
  const [selectedFile, setSelectedFile] = useState<File | string | undefined>(
    meme?.media_url
  );

  const fileURLForRender =
    selectedFile && typeof selectedFile !== "string"
      ? URL.createObjectURL(selectedFile)
      : selectedFile;

  const [title, setTitle] = useState(meme?.title || "");
  const [description, setDescription] = useState(meme?.description || "");
  const [tags, setTags] = useState(meme?.tags || []);
  const [languages, setLanguages] = useState<string[]>(meme?.languages || []);
  const [selectedCharacters, setSelectedCharacters] = useState(
    meme?.characters || []
  );

  useEffect(() => {
    if (meme) {
      setTitle(meme.title);
      setDescription(meme.description || "");
      setLanguages(meme.languages || []);
      setSelectedFile(meme.media_url);
      setTags(meme.tags);
      setSelectedCharacters(meme.characters);
    }
  }, [meme]);

  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const { setIsLoading } = useFullScreenLoading();
  const { user } = useUser();

  const { supabaseClient: supabase } = useSessionContext();
  const uploadFile = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const mediaType = file.type;
    const filePath = `public/${user?.id || "unknown"}/${fileName}`;
    const { error } = await uploadMemeToSupabase(supabase, file, filePath);

    if (error) throw error;

    const mediaUrl = supabase.storage.from("Meme_Bucket").getPublicUrl(filePath)
      .data.publicUrl;
    return { mediaType, mediaUrl, filePath };
  };

  const createNewMeme = async (file: File) => {
    const { mediaUrl, filePath, mediaType } = await uploadFile(file);
    const newMemeData = {
      title,
      description,
      media_url: mediaUrl,
      media_path: filePath,
      media_type: mediaType,
      created_by: user!.id,
      status: "draft" as Meme["status"],
      languages,
      created_at: null,
      tags,
      characters: selectedCharacters,
    };

    const { data, error } = await createOrUpdateMemeInDatabase(supabase, {
      ...newMemeData,
    });
    if (error) throw error;

    toast.success("Meme uploaded successfully!");
    return data;
  };

  const updateExistingMeme = async (meme: MemeWithTags, file?: File) => {
    const updatedInfo: MemeWithTags = {
      ...meme,
      id: meme.id,
      title,
      description,
      languages,
      created_by: user!.id,
      status: "draft" as Meme["status"],
      tags: tags,
      characters: selectedCharacters,
    };

    if (file) {
      const { mediaUrl, filePath, mediaType } = await uploadFile(file);
      Object.assign(updatedInfo, {
        media_url: mediaUrl,
        media_path: filePath,
        media_type: mediaType,
      });
    }

    const { data, error } = await createOrUpdateMemeInDatabase(
      supabase,
      updatedInfo
    );

    if (error) throw error;

    toast.success("Meme updated successfully!");
    return data;
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedFile || !title) {
      toast.error("Please provide a title and media for the meme.");
      return;
    }

    setIsLoading(true);
    try {
      let data;
      if (!meme) {
        // Creating a new meme
        data = await createNewMeme(selectedFile as File);
      } else {
        // Updating an existing meme
        data = await updateExistingMeme(
          meme,
          typeof selectedFile !== "string" ? selectedFile : undefined
        );
      }
      if (data) {
        const newMeme = {
          ...meme,
          id: data.returned_meme_id,
          title: data.returned_title,
          description: data.returned_description,
          media_url: data.returned_media_url,
          media_path: data.returned_media_path,
          media_type: data.returned_media_type,
          status: data.returned_status,
          created_by: data.returned_created_by,
          languages: data.returned_languages,
          tags: data.returned_tags,
          characters: data.returned_characters,
        };
        navigate(`/meme/${newMeme.id}`, { state: { meme: newMeme } });
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  const onCancelConfirm = () => {
    navigate("/my-memes");
  };

  return (
    <Container maxWidth="xl" sx={{ paddingY: 4 }}>
      <Text variant="h3" textAlign={"center"}>
        Upload your meme
      </Text>
      <Box role="form" component="form" paddingTop={2}>
        <Stack spacing={2}>
          {fileURLForRender ? (
            <Box position={"relative"}>
              <MediaRenderer
                type={
                  selectedFile && typeof selectedFile !== "string"
                    ? selectedFile.type
                    : meme?.media_type || ""
                }
                src={fileURLForRender}
                alt={meme?.title || ""}
              />
              <IconButton
                sx={{ position: "absolute", top: "10px", right: "10px" }}
                onClick={() => {
                  setSelectedFile(undefined);
                }}
              >
                <CloseOutlined />
              </IconButton>
            </Box>
          ) : (
            <FileUploadArea {...{ selectedFile, setSelectedFile }} />
          )}
          <TextField
            label="Title"
            required
            value={title}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            label="Description"
            multiline
            required
            rows={4}
            value={description}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value);
            }}
          />

          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            width={"100%"}
          >
            <TagsSelector {...{ tags, setTags }} />
            <LanguageSelector
              selectedLanguages={languages}
              setSelectedLanguages={setLanguages}
            />
          </Stack>
          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            width={"100%"}
          >
            <CharacterSelector
              {...{ selectedCharacters, setSelectedCharacters }}
            />
          </Stack>

          <Stack direction={"row"} gap={2}>
            <ContainedButton
              size="large"
              sx={{ flex: 1 }}
              onClick={handleSubmit}
            >
              Save
            </ContainedButton>
            <Button variant="outlined" onClick={handleClickOpen}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cancel without saving?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel without saving changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Go Back
          </Button>
          <Button color="error" onClick={onCancelConfirm}>
            Cancel Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
