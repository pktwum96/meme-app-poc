import Container from "@mui/material/Container";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import MemeList from "../../components/MemeList";
import { getAllMyMemes } from "../../queries/memes";
import { Meme } from "../../supabase/types";
import { useUser } from "../../supabase/useUser";

import { capitalize, groupBy } from "lodash";
import Text from "../../components/Text";

export const MyMemes = () => {
  const [memeList, setMemeList] = useState<Meme[]>([]);

  const { supabaseClient } = useSessionContext();
  const { userDetails } = useUser();

  const userId = userDetails?.id;

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

  const arrangedMemes = groupBy(memeList, ({ status }) => status);
  return (
    <Container maxWidth="xl">
      {Object.keys(arrangedMemes).map((memeStatus) => {
        return (
          <Fragment key={memeStatus}>
            <Text variant="h6" padding={2} paddingTop={3}>
              {capitalize(memeStatus)}
            </Text>
            <MemeList memes={arrangedMemes[memeStatus]} />
          </Fragment>
        );
      })}
    </Container>
  );
};
