import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { LanguageOption, languages } from "../assets/data/languages";
import { retrieveLanguageFromList } from "../helpers/utils";

const filter = createFilterOptions<LanguageOption>();

interface LanguageSelectorProps {
  selectedLanguages: string[];
  setSelectedLanguages: Dispatch<SetStateAction<string[]>>;
}
export default function LanguageSelector({
  selectedLanguages,
  setSelectedLanguages,
}: LanguageSelectorProps) {
  const formattedSelected = selectedLanguages.map((selected) => {
    return (
      retrieveLanguageFromList(selected) || { code: selected, name: selected }
    );
  });

  return (
    <Autocomplete
      value={formattedSelected}
      multiple
      onChange={(_event, newValues) => {
        const newLanguages = newValues.map((val) => {
          if (typeof val === "string") {
            return val;
          } else {
            return val.code;
          }
        });
        setSelectedLanguages(newLanguages);
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
        return <li {...props}>{option.name}</li>;
      }}
      sx={{ flex: 1 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Languages" />}
    />
  );
}
