import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { FullScreenLoading } from "../../components/FullScreenLoading";
interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const defaultContext = {
  isLoading: false,
  setIsLoading: () => {},
};

export const LoadingContext =
  createContext<LoadingContextProps>(defaultContext);

interface LoadingProviderProps extends PropsWithChildren {}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const value = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {isLoading ? <FullScreenLoading /> : null}
      {children}
    </LoadingContext.Provider>
  );
};
