import {
  User,
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFullScreenLoading } from "../contexts/loading";
import { getUserDetails } from "../queries/users";
import { UserDetails, UserPreferences } from "./types";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  userPreferences: UserPreferences | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  accessToken: null,
  user: null,
  userDetails: null,
  userPreferences: null,
  isLoading: false,
});

export const UserProvider = (props: PropsWithChildren) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const { setIsLoading } = useFullScreenLoading();
  const [userPreferences] = useState<UserPreferences | null>(null);

  const [hasError, setHasError] = useState(false); // Track error state

  useEffect(() => {
    const getUserDetailsFromDatabase = async () => {
      if (user) {
        try {
          const { data, error } = await getUserDetails(supabase, user?.id);

          if (error) throw error;

          return data as UserDetails;
        } catch (error) {
          toast.error(
            `Error fetching user details:  ${(error as Error).message}`
          );
          setHasError(true); // Set error flag
          return null;
        }
      } else return null;
    };

    // const getUserPreferencesFromDatabase = async () => {
    //   if (user) {
    //     const { data, error } = await getUserPreferences(supabase, user.id);
    //     if (error) {
    //       return null;
    //     }
    //     return data as UserPreferences;
    //   } else {
    //     return null;
    //   }
    // };
    const fetchUserDetails = async () => {
      if (user && !isLoadingData && !userDetails && !hasError) {
        setIsLoadingData(true);
        setIsLoading(true);
        const [details] = await Promise.all([
          getUserDetailsFromDatabase(),
          // getUserPreferencesFromDatabase(),
        ]);

        if (details) setUserDetails(details);
        // if (preferences) setUserPreferences(preferences);

        setIsLoadingData(false);
        setIsLoading(false);
      }
    };

    if (user && !userDetails && !hasError) {
      fetchUserDetails();
    } else if (!user && !isLoadingUser && isLoadingData) {
      setUserDetails(null);
    }
  }, [
    user,
    isLoadingUser,
    isLoadingData,
    userDetails,
    hasError,
    setIsLoading,
    supabase,
  ]);

  const value = {
    accessToken,
    user,
    userDetails,
    userPreferences,
    isLoading: isLoadingData || isLoadingUser,
  };

  return <UserContext.Provider value={value} {...props} />;
};
