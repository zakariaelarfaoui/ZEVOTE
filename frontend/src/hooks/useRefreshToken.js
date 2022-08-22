import jwt_decode from "jwt-decode";

import axios from "../api/axios";

import useAuth from "./useAuth";

const useRefreshToken = () => {
  const {setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh-token", {
      withCredentials: true,
    });
    const payload = jwt_decode(response.data.accessToken);
    setAuth((prev) => {
      return { ...payload, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
