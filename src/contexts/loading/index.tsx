import { useContext } from "react";
import { LoadingContext } from "./LoadingProvider";

export const useFullScreenLoading = () => {
  return useContext(LoadingContext);
};
