import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie, getRoleFromLocalCookie } from "./auth";

let userState;

const User = createContext({ user: null, loading: false, role: null });

export const UserProvider = ({ value, children }) => {
  const { user } = value;

  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};



export const useUser = () => useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState || null,
    loading: userState === undefined,
    role: userState || undefined,
  });

  useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;
    const resolveUser = async () => {
      const user = await getUserFromLocalCookie();
      const role = await getRoleFromLocalCookie();
      if (isMounted) {
        setUser({ user, loading: false, role });
      }
    };
    resolveUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
};
