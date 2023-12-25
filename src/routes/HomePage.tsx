import { Container } from "@mui/material";
import HomeCategoriesSection from "../components/HomeCategoriesSection";
import SearchJumbotron from "../components/SearchJumbotron";
import { memeDatabase } from "../data/memes";

function HomePage() {
  return (
    <Container>
      <SearchJumbotron />

      <Container>
        <HomeCategoriesSection
          sectionTitle={"Latest"}
          memeList={memeDatabase}
        />
        <HomeCategoriesSection
          sectionTitle={"Most Popular"}
          memeList={memeDatabase}
        />
      </Container>
    </Container>
  );
}

export default HomePage;
