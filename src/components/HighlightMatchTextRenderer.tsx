import Typography, { TypographyProps } from "@mui/material/Typography";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { Fragment } from "react";

interface HighlightMatchTextRendererProps extends TypographyProps {
  inputValue: string;
  textToMatch: string;
}
export const HighlightMatchTextRenderer = ({
  inputValue,
  textToMatch,
  ...restProps
}: HighlightMatchTextRendererProps) => {
  const matches = match(textToMatch, inputValue, {
    insideWords: true,
  });

  const parts = parse(textToMatch, matches);
  return (
    <Fragment>
      {parts.map((part, partIndex) => {
        return (
          <Typography
            sx={
              part.highlight
                ? {
                    fontWeight: "bold",
                    marginRight: "1px",
                    fontStyle: "italic",
                  }
                : {}
            }
            component="span"
            variant="body2"
            color="text.primary"
            key={part.text + partIndex}
            {...restProps}
          >
            {part.text}
          </Typography>
        );
      })}
    </Fragment>
  );
};
