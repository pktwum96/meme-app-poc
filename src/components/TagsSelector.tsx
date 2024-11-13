import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useSessionContext } from "@supabase/auth-helpers-react";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { Dispatch, Fragment, useState } from "react";
import toast from "react-hot-toast";
import { getAllTags } from "../queries/tags";

const filter = createFilterOptions<string>();

export default function TagsSelector({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: Dispatch<React.SetStateAction<string[]>>;
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useSessionContext();
  const [inputValue, setInputValue] = useState("");

  const handleOpen = () => {
    setOpen(true);

    const fetchTags = async () => {
      setLoading(true);
      const { data, error } = await getAllTags(supabaseClient);

      if (error) {
        return toast(error.message);
      }
      setLoading(false);
      if (data) {
        const flattenedData = data.map((tag) => tag.name);
        setOptions(flattenedData);
      }
    };
    if (!options.length) {
      fetchTags();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Autocomplete
      sx={{ flex: 1 }}
      open={open}
      multiple
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={(_event, newValues, _s, selected) => {
        if (selected?.option.includes("Add ")) {
          setTags((prev) => [
            ...prev,
            (selected.option.match(/"([^"]*)"/) || [])[1],
          ]);
        } else {
          setTags(newValues as string[]);
        }
      }}
      value={tags}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      loading={loading}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== "" && !isExisting) {
          filtered.push(`Add "${inputValue}"`);
        }

        return filtered;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches = match(option, inputValue);

        const parts = parse(option, matches);

        return (
          <li key={props.id + "" + option} {...props}>
            {parts.map((part, index) => (
              <Box
                key={index}
                component="span"
                sx={{
                  fontWeight: part.highlight ? "bold" : "regular",
                }}
              >
                {part.text}
              </Box>
            ))}
          </li>
        );
      }}
    />
  );
}