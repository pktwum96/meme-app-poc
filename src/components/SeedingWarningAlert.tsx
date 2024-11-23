import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const SeedingWarningAlert = () => {
  return (
    <Alert variant="filled" severity="warning" sx={{ marginBottom: 2 }}>
      <AlertTitle>🌱 We're Growing!</AlertTitle>
      Our meme collection is currently in seeding mode, and we're actively
      uploading fresh content. Don't worry if you don't see much yet—great memes
      are on their way! 🎉
    </Alert>
  );
};
