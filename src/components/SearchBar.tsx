import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar({
  onSubmit,
  defaultValue,
}: {
  defaultValue?: string;
  onSubmit?: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState(defaultValue || "");

  const navigate = useNavigate();

  const onSearch = () => {
    if (onSubmit) {
      onSubmit(searchQuery);
    } else {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Autocomplete
      id="main-search"
      freeSolo
      onSubmit={onSearch}
      defaultValue={defaultValue}
      value={searchQuery}
      options={[]}
      sx={{ flex: 1, flexGrow: 1 }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Meme"
          onSubmit={onSearch}
          value={searchQuery}
          onChange={onChange}
          InputProps={{
            ...params.InputProps,
            type: "search",
            style: {
              width: "100%",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="Search memes button" onClick={onSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
