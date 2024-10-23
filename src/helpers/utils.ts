import { useEffect } from "react";
import { Meme, UserDetails } from "../supabase/types";

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} || MidToSenior`;
  }, [title]);
};

export const isReviewer = (user: UserDetails) => {
  return user.role === "administrator" || user.role === "moderator";
};

export const isMemeDraft = (meme: Meme) => {
  return meme.status === "draft";
};

export const isMemeInReview = (meme: Meme) => {
  return meme.status === "review";
};
