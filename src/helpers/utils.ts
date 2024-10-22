import { useEffect } from "react";
import { UserDetails } from "../supabase/types";

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} || MidToSenior`;
  }, [title]);
};

export const isReviewer = (user: UserDetails) => {
  return user.role === "administrator" || user.role === "moderator";
};
