import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContainedButton } from "../../components/ContainedButton";
import HomeCategoriesSection from "../../components/HomeCategoriesSection";
import SearchBar from "../../components/SearchBar";
import { getAllMemes } from "../../queries/memes";
import { Meme } from "../../supabase/types";

export const HomePage = () => {
  const navigate = useNavigate();

  const [memeList, setMemeList] = useState<Meme[]>([]);

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const { data, error } = await getAllMemes(supabaseClient);
        if (error) {
          throw error;
        }
        if (data) {
          setMemeList(data);
        }
      } catch (error) {
        toast((error as any).message);
      }
    };
    fetchMemes();
  }, []);
  return (
    <Container maxWidth="xl" sx={{ paddingY: 4 }}>
      <Box display={"flex"}>
        <SearchBar />
        <ContainedButton
          sx={{ marginLeft: 2 }}
          onClick={() => navigate("/upload")}
        >
          Upload Meme
        </ContainedButton>
      </Box>
      <HomeCategoriesSection sectionTitle={"Latest"} memeList={memeList} />
    </Container>
  );
};
