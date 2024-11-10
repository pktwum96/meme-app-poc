import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useSessionContext } from "@supabase/auth-helpers-react";
import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { getAllTags } from "../queries/tags";

const filter = createFilterOptions<string>();

export default function TagsSelector() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { supabaseClient } = useSessionContext();

  const handleOpen = () => {
    setOpen(true);
    (async () => {
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
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
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
          setSelectedTags((prev) => [
            ...prev,
            (selected.option.match(/"([^"]*)"/) || [])[1],
          ]);
        } else {
          setSelectedTags(newValues as string[]);
        }
      }}
      value={selectedTags}
      options={options}
      loading={loading}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
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
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
