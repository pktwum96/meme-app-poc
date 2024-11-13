import { useEffect } from "react";
import { languages } from "../assets/data/languages";
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

export const retrieveLanguageFromList = (code: string) => {
  return languages.find((lang) => lang.code === code);
};
