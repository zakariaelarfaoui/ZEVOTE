import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

import LoadingScreen from "./LoadingScreen";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const rememberMe = true;

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>{!rememberMe ? <Outlet /> : isLoading ? <LoadingScreen /> : <Outlet />}</>
  );
};

export default PersistLogin;
