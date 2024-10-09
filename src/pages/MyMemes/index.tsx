import Container from "@mui/material/Container";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MemeList from "../../components/MemeList";
import { getAllMyMemes } from "../../queries/memes";
import { Meme } from "../../supabase/types";
import { useUser } from "../../supabase/useUser";

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
          toast((error as any).message);
        }
      }
    };
    fetchMemes();
  }, [userId]);
  return (
    <Container maxWidth="xl" sx={{ paddingY: 4 }}>
      <MemeList memes={memeList} />
    </Container>
  );
};
