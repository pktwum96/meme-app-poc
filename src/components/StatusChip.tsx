import Chip, { ChipProps } from "@mui/material/Chip";
import { Enums } from "../supabase/database.types";

const getColorByStatus = (
  status: Enums<"Meme Publish Status">
): ChipProps["color"] => {
  switch (status) {
    case "draft":
      return "warning";
    case "rejected":
      return "error";
    case "published":
      return "success";
    case "review":
    default:
      return "info";
  }
};

export const StatusChip = (
  props: ChipProps & { status: Enums<"Meme Publish Status"> }
) => {
  const { status, ...chipProps } = props;

  return <Chip {...chipProps} color={getColorByStatus(status)} />;
};
