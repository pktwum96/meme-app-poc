import {
  User,
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFullScreenLoading } from "../contexts/loading";
import { getUserDetails, getUserPreferences } from "../queries/users";
import { UserDetails, UserPreferences } from "./types";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  userPreferences: UserPreferences | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  accessToken: null,
  user: null,
  userDetails: null,
  userPreferences: null,
  isLoading: false,
});

interface Props {
  [propName: string]: any;
}

export const UserProvider = (props: Props) => {
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
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(null);

  const [hasError, setHasError] = useState(false); // Track error state

  const getUserDetailsFromDatabase = async () => {
    if (user) {
      try {
        const { data, error } = await getUserDetails(supabase, user?.id);

        if (error) throw error;

        return data as UserDetails;
      } catch (error) {
        toast.error("Error fetching user details:", (error as any).message);
        setHasError(true); // Set error flag
        return null;
      }
    } else return null;
  };

  const getUserPreferencesFromDatabase = async () => {
    if (user) {
      const { data, error } = await getUserPreferences(supabase, user.id);
      if (error) {
        return null;
      }
      return data as UserPreferences;
    } else {
      return null;
    }
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && !isLoadingData && !userDetails && !hasError) {
        setIsLoadingData(true);
        setIsLoading(true);
        const [details, preferences] = await Promise.all([
          getUserDetailsFromDatabase(),
          getUserPreferencesFromDatabase(),
        ]);

        if (details) setUserDetails(details);
        if (preferences) setUserPreferences(preferences);

        setIsLoadingData(false);
        setIsLoading(false);
      }
    };

    if (user && !userDetails && !hasError) {
      fetchUserDetails();
    } else if (!user && !isLoadingUser && isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser, isLoadingData, userDetails, hasError]);

  const value = {
    accessToken,
    user,
    userDetails,
    userPreferences,
    isLoading: isLoadingData || isLoadingUser,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
