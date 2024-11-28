import { useEffect } from "react";
import { languages } from "../assets/data/languages";
import { Meme, RawMemeWithAssociations, UserDetails } from "../supabase/types";

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} || The Meme Finder`;
  }, [title]);
};

export const isReviewer = (user: UserDetails) => {
  return user.role === "administrator" || user.role === "moderator";
};

export const isMemeDraft = (meme: Meme) => {
  return meme.status === "draft";
};

export const isMemeRejected = (meme: Meme) => {
  return meme.status === "rejected";
};

// export const isMemeInReview = (meme: Meme) => {
//   return meme.status === "review";
// };

export const retrieveLanguageFromList = (code: string) => {
  return languages.find((lang) => lang.code === code);
};

export const normalizeMemeTags = (meme: RawMemeWithAssociations) => {
  return {
    ...meme,
    tags: meme.tags.map((tag: { name: string }) => tag.name),
  };
};
