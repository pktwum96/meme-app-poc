import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar({
  value,
  setValue,
  onSubmit,
}: {
  rounded?: boolean;
  value?: string;
  setValue?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onSubmit?: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const onClickSubmit = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value);
  };

  setValue;
  return (
    <Autocomplete
      id="main-search"
      freeSolo
      onSubmit={onSubmit || onClickSubmit}
      defaultValue={value}
      value={value}
      options={[]}
      sx={{ flex: 1, flexGrow: 1 }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Meme"
          onSubmit={onSubmit}
          value={value || searchQuery}
          onChange={setValue || onChange}
          InputProps={{
            ...params.InputProps,
            type: "search",
            style: {
              width: "100%",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onSubmit || onClickSubmit}>
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
