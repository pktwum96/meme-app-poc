import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { useFullScreenLoading } from "../../contexts/loading";
import { getMemeById } from "../../queries/memes";
import { MemeWithTags } from "../../supabase/types";
import { CreateMemePage } from "../CreateMemePage";

export const EditMemePage = () => {
  const { memeId } = useParams();
  const state = useLocation().state;

  const stateMeme = state?.meme;
  const [meme, setMeme] = useState<MemeWithTags | undefined>(stateMeme);
  const { supabaseClient } = useSessionContext();
  const { setIsLoading } = useFullScreenLoading();

  useEffect(() => {
    const fetchMeme = async () => {
      setIsLoading(true);
      try {
        if (!meme && memeId) {
          const { data, error } = await getMemeById(supabaseClient, memeId);

          if (error) {
            throw new Error(error.message);
          }
          if (data) {
            const memeData = {
              ...data,
              tags: data.tags.map((tag: { name: string }) => tag.name),
            };
            setMeme(memeData);
          }
        }
      } catch (error) {
        setIsLoading(false);
        toast.error((error as Error).message);
      }
    };
    fetchMeme();
    setIsLoading(false);
  }, [memeId, meme, setIsLoading, supabaseClient]);

  return <CreateMemePage meme={meme} />;
};
