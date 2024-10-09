import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { ContainedButton } from "../../components/ContainedButton";
import HomeCategoriesSection from "../../components/HomeCategoriesSection";
import SearchBar from "../../components/SearchBar";
import { memeDatabase } from "../../data/memes";

export const HomePage = () => {
  const navigate = useNavigate();
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
      <HomeCategoriesSection sectionTitle={"Latest"} memeList={memeDatabase} />
      <HomeCategoriesSection
        sectionTitle={"Most Popular"}
        memeList={[...memeDatabase].reverse()}
      />
    </Container>
  );
};
