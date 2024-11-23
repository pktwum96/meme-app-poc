import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LanguageOption, languages } from "../assets/data/languages";
import { retrieveLanguageFromList } from "../helpers/utils";
import { HighlightMatchTextRenderer } from "./HighlightMatchTextRenderer";

const filter = createFilterOptions<LanguageOption>();

interface LanguageSelectorProps {
  selectedLanguages: string[];
  setSelectedLanguages: Dispatch<SetStateAction<string[]>>;
}
export function LanguageSelector({
  selectedLanguages,
  setSelectedLanguages,
}: LanguageSelectorProps) {
  const [inputValue, setInputValue] = useState("");

  const [stateSelected, setstateSelected] = useState<
    {
      code: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    const formattedSelected = selectedLanguages.map((selected) => {
      return (
        retrieveLanguageFromList(selected) || { code: selected, name: selected }
      );
    });
    setstateSelected(formattedSelected);
  }, [selectedLanguages]);

  return (
    <Autocomplete
      value={stateSelected}
      multiple
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
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
          <li {...props}>
            <HighlightMatchTextRenderer
              inputValue={inputValue}
              textToMatch={option.name}
            />
          </li>
        );
      }}
      sx={{ flex: 1 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Languages" />}
    />
  );
}
