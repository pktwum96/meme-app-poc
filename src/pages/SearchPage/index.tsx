import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Box,
  Button,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";

import MemeList from "../../components/MemeList";
// import { Meme } from "../../supabase/types";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [mediaTypes, setMediaTypes] = useState<string[]>(
    (searchParams.get("mediaTypes") || "video,gif,image").split(",")
  );
  const [memes] = useState([]);

  // useEffect(() => {
  //   const filteredMemes = [].filter((item: Meme) => {
  //     return (
  //       (item.title.toLowerCase().includes(query.toLowerCase()) ||
  //         item.description.toLowerCase().includes(query.toLowerCase())) &&
  //       mediaTypes.includes(item.type)
  //     );
  //   });

  //   setMemes(filteredMemes);
  // }, [searchParams]);

  const onFilterToggle = () => {
    setIsOpen(!isOpen);
  };

  const onMediaTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTypes: string[]
  ) => {
    setMediaTypes(newTypes);
  };

  const setSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const applyFilters = () => {
    const newQueryParameters: URLSearchParams = new URLSearchParams();
    newQueryParameters.set("mediaTypes", mediaTypes.join(","));
    newQueryParameters.set("query", query);
    setSearchParams(newQueryParameters);
  };

  return (
    <Container maxWidth="xl" sx={{ paddingY: 4 }}>
      <Box display={"flex"}>
        <SearchBar
          rounded={false}
          value={query}
          onSubmit={applyFilters}
          setValue={setSearchQuery}
        />
        <Button
          sx={{ marginX: 1 }}
          variant="contained"
          onClick={onFilterToggle}
        >
          Filter {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Button>
      </Box>

      <Collapse in={isOpen}>
        <Box
          sx={{
            marginY: 2,
            padding: 1,
            borderBottom: "0.05rem solid black",
          }}
        >
          <Box>
            <Typography variant="body2"> Media Type</Typography>
            <ToggleButtonGroup
              color="primary"
              value={mediaTypes}
              onChange={onMediaTypeChange}
            >
              <ToggleButton value="video" aria-label="video">
                Video
              </ToggleButton>
              <ToggleButton value="gif" aria-label="gif">
                GIF
              </ToggleButton>
              <ToggleButton value="image" aria-label="image">
                Image
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box padding={2} display={"flex"}>
            <Button
              sx={{ marginLeft: "auto" }}
              variant="contained"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Collapse>
      <Box marginY={2}>
        <MemeList memes={memes} />
      </Box>
    </Container>
  );
};
