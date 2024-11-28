import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar";
import { Text } from "../../components/Text";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { ContainedButton } from "../../components/ContainedButton";
import { MemeList } from "../../components/MemeList";
import { NoMemesFoundBox } from "../../components/NoMemesFoundBox";
import { SearchFilters } from "../../components/SearchFilters";
import { SeedingWarningAlert } from "../../components/SeedingWarningAlert";
import { normalizeMemeTags } from "../../helpers/utils";
import { searchMemes } from "../../queries/memes";
import { Meme } from "../../supabase/types";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");

  const [memes, setMemes] = useState<Meme[] | null>(null);

  const tags = searchParams.getAll("tag");

  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    const fetchMemes = async () => {
      const { data, error } = await searchMemes(supabaseClient, query, {
        tags,
      });

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
  }, [query, supabaseClient, JSON.stringify(tags)]);

  const applySort = (event: SelectChangeEvent) => {
    const order = event.target.value;

    const newOrder = [...(memes || [])];

    newOrder.sort((a, b) => {
      const [first, second] = order === "newest" ? [a, b] : [b, a];

      return (
        new Date(first.published_at || "").getTime() -
        new Date(second.published_at || "").getTime()
      );
    });

    setMemes(newOrder);
  };

  const [filterModalOpen, setFilterModalOpen] = useState(false);

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

      <Box
        marginY={2}
        gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
        sx={{
          display: {
            md: "grid",
            xs: "flex",
          },
          flexDirection: {
            md: undefined,
            xs: "column",
          },
          columnGap: 2,
        }}
      >
        <Box
          sx={{
            gridColumnStart: "span 1",
            display: { xs: "none", md: "block" },
          }}
        >
          <SearchFilters />
        </Box>
        <Box sx={{ gridColumnStart: "span 3" }}>
          {memes.length ? (
            <>
              <Box
                paddingBottom={2}
                display={"flex"}
                alignItems={"flex-end"}
                justifyContent={"space-between"}
              >
                <Text variant="body2">
                  <strong>{memes.length} </strong> matches
                </Text>

                <Stack direction={"row"}>
                  <ContainedButton onClick={() => setFilterModalOpen(true)}>
                    Filters
                  </ContainedButton>
                  <FormControl sx={{ minWidth: "9rem", marginLeft: 2 }}>
                    <InputLabel size="small" id="sort-selector-label">
                      Sort
                    </InputLabel>
                    <Select
                      label="Sort"
                      defaultValue="newest"
                      size="small"
                      labelId="sort-selector-label"
                      id="sort-selector"
                      onChange={applySort}
                    >
                      <MenuItem value={"newest"}>Newest</MenuItem>
                      <MenuItem value={"oldest"}>Oldest</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Box>
              <MemeList memes={memes} />
            </>
          ) : (
            <NoMemesFoundBox />
          )}
        </Box>
      </Box>
      <Dialog
        open={filterModalOpen}
        fullWidth
        maxWidth={"xl"}
        onClose={() => setFilterModalOpen(false)}
      >
        <SearchFilters />
      </Dialog>
    </Container>
  );
};
