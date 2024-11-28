import { Text } from "./Text";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ContainedButton } from "./ContainedButton";
import { TagsSelector } from "./TagsSelector";

export const SearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tags, setTags] = useState(searchParams.getAll("tag") || []);
  const [selectedLanguages] = useState(searchParams.getAll("lang") || []);

  console.log(tags);

  const onApplyFilter = () => {
    const newParams = new URLSearchParams();

    newParams.set("query", searchParams.get("query") || "");
    tags.forEach((tag) => newParams.append("tag", tag));
    selectedLanguages.forEach((lang) => newParams.append("lang", lang));

    setSearchParams(newParams);
  };

  return (
    <Paper
      sx={{
        height: "100%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Text variant="body1">
        <strong>Filters</strong>
      </Text>
      {/* <Box>
      <CharacterSelector /> 
      </Box> */}
      <Box>
        <TagsSelector {...{ tags, setTags }} />
      </Box>
      {/* <Box>
        <LanguageSelector {...{ selectedLanguages, setSelectedLanguages }} />
      </Box> */}

      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Button variant="outlined">Clear</Button>
        <ContainedButton onClick={onApplyFilter}>Apply</ContainedButton>
      </Stack>
    </Paper>
  );
};
