import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { ContainedButton } from "../../components/ContainedButton";
import FileUploadArea from "../../components/FileUploadArea";
import Text from "../../components/Text";
import { useUser } from "../../supabase/useUser";

export const UploadMemePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();

  const { supabaseClient: supabase } = useSessionContext();
  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile || !title) {
      return;
    }

    try {
      // Upload file to Supabase storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;
      const { error } = await supabase.storage
        .from("Meme_Bucket") // 'memes' is your storage bucket name
        .upload(filePath, selectedFile);

      if (error) {
        throw error;
      }
      const mediaUrl = supabase.storage
        .from("Meme_Bucket")
        .getPublicUrl(filePath).data.publicUrl;

      // Insert meme data into the memes table
      const { error: dbError } = await supabase.from("memes").insert({
        title,
        description,
        media_url: mediaUrl, // Full public URL for frontend use
        media_path: filePath,
        media_type: selectedFile.type,
        created_by: user?.id, // Assumes user is authenticated
        status: "draft", // Default status
      });

      if (dbError) {
        console.log(dbError);
        throw dbError;
      }

      toast("Meme uploaded successfully!");
      setSelectedFile(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      toast((error as any).message);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ paddingY: 4 }}>
      <Text variant="h3" textAlign={"center"}>
        Upload your meme
      </Text>
      <Box component="form" paddingTop={2} onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FileUploadArea {...{ selectedFile, setSelectedFile }} />
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

          <Stack spacing={2} direction={"row"} width={"100%"}>
            <TextField label="Tags" />

            <TextField label="Tags" />
          </Stack>
          <ContainedButton size="large" type="submit">
            Upload Meme
          </ContainedButton>
        </Stack>
      </Box>
    </Container>
  );
};
