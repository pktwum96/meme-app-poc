import CardMedia from "@mui/material/CardMedia";

export const MediaRenderer = ({ type, src }: { type: string; src: string }) => {
  const mediaType = type.includes("video") ? "video" : "img";
  return (
    <CardMedia src={src} component={mediaType} sx={{ aspectRatio: "16/9" }} />
  );
};
