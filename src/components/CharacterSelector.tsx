import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useSessionContext } from "@supabase/auth-helpers-react";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { getAllCharacters } from "../queries/tags";
import { Character } from "../supabase/types";

const filter = createFilterOptions<Character>({
  stringify: (option: Character) => option.name + option.aliases?.join(" "),
});

interface CharacterSelectorProps {
  selectedCharacters: Character[];
  setSelectedCharacters: Dispatch<SetStateAction<Character[]>>;
}

const emptyCharacter = {
  aliases: [],
  category: [],
  created_at: null,
  id: "",
  metadata: {},
  profile_url: null,
  name: ``,
};
export default function CharacterSelector({
  selectedCharacters,
  setSelectedCharacters,
}: CharacterSelectorProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  const [dialogValue, setDialogValue] = useState<Character>(emptyCharacter);

  const [newCharacterDialogOpen, toggleNewCharacterDialogOpen] =
    useState(false);

  const handleNewCharacterDialogClose = () => {
    setDialogValue(emptyCharacter);
    toggleNewCharacterDialogOpen(false);
  };

  const { supabaseClient } = useSessionContext();

  const handleOpen = () => {
    setOpen(true);

    const fetchTags = async () => {
      setLoading(true);
      const { data, error } = await getAllCharacters(supabaseClient);

      if (error) {
        return toast(error.message);
      }
      setLoading(false);
      if (data) {
        setOptions(data);
      }
    };
    if (!options.length) {
      fetchTags();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAddNewCharacter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedCharacters([...selectedCharacters, dialogValue]);
    handleNewCharacterDialogClose();
  };

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Autocomplete
        value={selectedCharacters}
        open={open}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        multiple
        freeSolo
        loading={loading}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={(_event, newValues, _s, selected) => {
          if (
            typeof selected === "string" ||
            selected?.option.name.includes("Add ")
          ) {
            const addedValue = (selected.option.name.match(/"([^"]*)"/) ||
              [])[1];

            setTimeout(() => {
              toggleNewCharacterDialogOpen(true);
              setDialogValue({ ...emptyCharacter, name: addedValue });
            });
          } else {
            setSelectedCharacters(newValues as Character[]);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.name
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              ...emptyCharacter,
              name: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={options}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }

          return option.name;
        }}
        renderOption={(props, option) => {
          const nameMatches = match(option.name, inputValue, {
            insideWords: true,
          });
          const parts = parse(option.name, nameMatches);

          return (
            <ListItem {...props} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={option.name}
                  src={option.profile_url || undefined}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    {parts.map((part, index) => {
                      return (
                        <Box
                          component={"span"}
                          key={part.text + index}
                          sx={{
                            fontWeight: part.highlight ? "bold" : "regular",
                          }}
                        >
                          {part.text}
                        </Box>
                      );
                    })}
                  </>
                }
                secondary={
                  <>
                    {option.aliases?.map((alias, index, array) => {
                      const aliasMatches = match(alias, inputValue, {
                        insideWords: true,
                      });
                      const aliasParts = parse(alias, aliasMatches);
                      return (
                        <>
                          {aliasParts.map((aliasPart, partIndex) => {
                            return (
                              <Typography
                                sx={{
                                  display: "inline",
                                  fontWeight: aliasPart.highlight
                                    ? "bold"
                                    : "regular",
                                }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                key={alias + index + partIndex}
                              >
                                {aliasPart.text}
                              </Typography>
                            );
                          })}
                          {index !== array.length - 1 ? ", " : ""}
                        </>
                      );
                    })}
                  </>
                }
              />
            </ListItem>
          );
        }}
        sx={{ flex: 1 }}
        renderInput={(params) => <TextField {...params} label="Characters" />}
      />
      <Dialog open={newCharacterDialogOpen} onClose={handleClose}>
        <DialogTitle>Add a new character</DialogTitle>
        <DialogContent>
          <Stack gap={2} marginTop={2}>
            <TextField
              autoFocus
              id="name"
              value={dialogValue?.name}
              onChange={(event) =>
                setDialogValue({
                  ...emptyCharacter,
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="Title"
            />
            <TextField
              id="name"
              value={dialogValue?.aliases}
              onChange={(event) =>
                setDialogValue({
                  ...emptyCharacter,
                  ...dialogValue,
                  aliases: event.target.value?.split(","),
                })
              }
              label="Aliases"
              helperText="Separate aliases with a comma (,)"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewCharacterDialogClose}>Cancel</Button>
          <Button onClick={onAddNewCharacter}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
