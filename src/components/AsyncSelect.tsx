import { useEffect, useMemo, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { debounce } from "@mui/material/utils";

const autocompleteService = { current: null };

interface AsyncSelectProps {
  options: string[];
  selected: string[];
  loadValues: () => void;
}

export default function AsyncSelect(props: AsyncSelectProps) {
  const { options: propOptions, selected: propsSelected } = props;
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>(propOptions);
  const [selected, setSelected] = useState<string[]>(propsSelected);

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: string[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        400
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(selected || []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: string[]) => {
      if (active) {
        let newOptions: string[] = [];

        if (selected) {
          newOptions = selected;
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [selected, inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300 }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      multiple
      filterSelectedOptions
      value={selected}
      noOptionsText="No locations"
      onChange={(_event, newValue) => {
        setOptions(newValue ? [...newValue, ...options] : options);
        setSelected(newValue);
      }}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="Tags" fullWidth />}
    />
  );
}
