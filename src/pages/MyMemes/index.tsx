import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { capitalize, groupBy } from "lodash";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContainedButton } from "../../components/ContainedButton";
import { MemeList } from "../../components/MemeList";
import { Text } from "../../components/Text";
import { useTheme } from "../../contexts/theme";
import { getAllMyMemes } from "../../queries/memes";
import { Meme } from "../../supabase/types";
import { useUser } from "../../supabase/useUser";

export const MyMemes = () => {
  const [memeList, setMemeList] = useState<Meme[] | undefined>(undefined);

  const { supabaseClient } = useSessionContext();
  const { userDetails } = useUser();

  const userId = userDetails?.id;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemes = async () => {
      if (userId) {
        try {
          const { data, error } = await getAllMyMemes(supabaseClient, userId);

          if (error) {
            throw error;
          }
          if (data) {
            setMemeList(data);
          }
        } catch (error) {
          toast.error((error as Error).message);
        }
      }
    };
    fetchMemes();
  }, [userId, supabaseClient]);

  const { theme } = useTheme();

  if (memeList == undefined) {
    return <>Loading</>;
  }
  const arrangedMemes = groupBy(memeList, ({ status }) => status);
  return (
    <Container maxWidth="xl">
      {memeList.length ? (
        Object.keys(arrangedMemes).map((memeStatus) => {
          return (
            <Fragment key={memeStatus}>
              <Text variant="h6" padding={2} paddingTop={3}>
                {capitalize(memeStatus)}
              </Text>
              <MemeList memes={arrangedMemes[memeStatus]} />
            </Fragment>
          );
        })
      ) : (
        <Box
          height={"70vh"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack
            padding={4}
            justifyContent={"center"}
            border={`${theme.palette.divider} 2px dashed`}
            borderRadius={4}
          >
            <Text padding={6}>Nothing in here... yet... </Text>
            <ContainedButton onClick={() => navigate("/meme/create")}>
              Create a meme
            </ContainedButton>
          </Stack>
        </Box>
      )}

      <Fab
        variant="extended"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        onClick={() => navigate("/meme/create")}
      >
        <AddIcon sx={{ mr: 1 }} />
        Create New Meme
      </Fab>
    </Container>
  );
};
