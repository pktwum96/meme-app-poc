import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { LanguageOption, languages } from "../assets/data/languages";

const filter = createFilterOptions<LanguageOption>();

interface LanguageSelectorProps {
  selectedLanguages: LanguageOption[];
  setSelectedLanguages: Dispatch<SetStateAction<LanguageOption[]>>;
}
export default function LanguageSelector({
  selectedLanguages,
  setSelectedLanguages,
}: LanguageSelectorProps) {
  return (
    <Autocomplete
      value={selectedLanguages}
      multiple
      onChange={(_event, newValues, _s, selected) => {
        if (selected?.option.name.includes("Add ")) {
          setSelectedLanguages((prev) => [
            ...prev,
            { code: selected.option.code, name: selected.option.code },
          ]);
        } else {
          setSelectedLanguages(newValues as LanguageOption[]);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            code: inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={languages}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }

        return option.name;
      }}
      renderOption={(props, option) => {
        return (
          <li key={option.code} {...props}>
            {option.name}
          </li>
        );
      }}
      sx={{ flex: 1 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Languages" />}
    />
  );
}
