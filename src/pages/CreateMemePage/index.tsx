import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { isString } from "lodash";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContainedButton } from "../../components/ContainedButton";
import FileUploadArea from "../../components/FileUploadArea";
import LanguageSelector from "../../components/LanguageSelector";
import { MediaRenderer } from "../../components/MediaRenderer";
import TagsSelector from "../../components/TagsSelector";
import Text from "../../components/Text";
import { useFullScreenLoading } from "../../contexts/loading";
import {
  createMemeInDatabase,
  uploadMemeToSupabase,
} from "../../queries/memes";
import { Meme, MemeWithTags } from "../../supabase/types";
import { useUser } from "../../supabase/useUser";

export const CreateMemePage = ({ meme }: { meme?: MemeWithTags }) => {
  const [selectedFile, setSelectedFile] = useState<File | string | undefined>(
    meme?.media_url
  );

  const [title, setTitle] = useState(meme?.title || "");
  const [description, setDescription] = useState(meme?.description || "");
  const [tags, setTags] = useState(meme?.tags || []);
  const [languages, setLanguages] = useState<string[]>(meme?.languages || []);
  useEffect(() => {
    if (meme) {
      setTitle(meme.title);
      setDescription(meme.description || "");
      setLanguages(meme.languages || []);
      setSelectedFile(meme.media_url);
    }
  }, [meme]);

  const navigate = useNavigate();
  const { setIsLoading } = useFullScreenLoading();
  const { user } = useUser();

  const { supabaseClient: supabase } = useSessionContext();
  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile || !title) {
      return;
    }
    setIsLoading(true);

    try {
      let mediaUrl = meme?.media_url || "";
      let filePath = meme?.media_path;
      let mediaType = meme?.media_type;
      if (!isString(selectedFile)) {
        // Upload file to Supabase storage
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        mediaType = selectedFile.type;
        filePath = `public/${fileName}`;
        const { error } = await uploadMemeToSupabase(
          supabase,
          selectedFile,
          filePath
        );

        if (error) {
          throw error;
        }
        mediaUrl = supabase.storage.from("Meme_Bucket").getPublicUrl(filePath)
          .data.publicUrl;
      }
      // Insert meme data into the memes table

      const uploadMeme = {
        title,
        description,
        media_url: mediaUrl, // Full public URL for frontend use
        media_path: filePath,
        media_type: mediaType,
        created_by: user!.id, // Assumes user is authenticated
        status: "draft" as Meme["status"], // Default status
        languages,
      };
      const { data, error: dbError } = await createMemeInDatabase(
        supabase,
        uploadMeme
      );

      if (dbError) {
        throw dbError;
      }

      setIsLoading(false);
      toast.success("Meme uploaded successfully!");
      setSelectedFile(undefined);
      setTitle("");
      setDescription("");
      if (data) {
        navigate(`/meme/${data.id}`, { state: { meme: data } });
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
    setIsLoading(false);
  };
  return (
    <Container maxWidth="xl" sx={{ paddingY: 4 }}>
      <Text variant="h3" textAlign={"center"}>
        Upload your meme
      </Text>
      <Box role="form" component="form" paddingTop={2} onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {typeof selectedFile === "string" ? (
            <MediaRenderer
              type={meme?.media_type || ""}
              src={selectedFile}
              alt={meme?.title || ""}
            />
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

          <Stack direction={"row"} gap={2}>
            <ContainedButton size="large" sx={{ flex: 1 }} type="submit">
              Save
            </ContainedButton>
            <Button variant="outlined" onClick={() => navigate("/my-memes")}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};
