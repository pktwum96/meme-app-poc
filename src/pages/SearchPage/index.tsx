import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar";

import Box from "@mui/material/Box";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { MemeList } from "../../components/MemeList";
import { NoMemesFoundBox } from "../../components/NoMemesFoundBox";
import { SeedingWarningAlert } from "../../components/SeedingWarningAlert";
import { normalizeMemeTags } from "../../helpers/utils";
import { searchMemes } from "../../queries/memes";
import { Meme } from "../../supabase/types";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");

  const [memes, setMemes] = useState<Meme[] | null>(null);

  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    const fetchMemes = async () => {
      const { data, error } = await searchMemes(supabaseClient, query);

      if (error) {
        console.error(error);
        return [];
      }

      if (data) {
        const memeData = data.map((meme) => normalizeMemeTags(meme));
        setMemes(memeData);
      }
    };
    fetchMemes();
  }, [query, supabaseClient]);

  // const applyFilters = () => {
  //   const newQueryParameters: URLSearchParams = new URLSearchParams();
  //   newQueryParameters.set("query", query);
  //   setSearchParams(newQueryParameters);
  // };

  if (!memes) {
    return "Loading";
  }

  return (
    <Container maxWidth="xl" sx={{ paddingY: 4 }}>
      <SeedingWarningAlert />
      <Box display={"flex"}>
        <SearchBar
          defaultValue={query}
          onSubmit={(query) => {
            setQuery(query);
          }}
        />
      </Box>

      <Box marginY={2}>
        {memes.length ? <MemeList memes={memes} /> : <NoMemesFoundBox />}
      </Box>
    </Container>
  );
};
