import { useContext } from "react";

import AppContext from "../context/GlobalContext";

const useGlobalContext = () => {
  return useContext(AppContext);
};

export default useGlobalContext;
