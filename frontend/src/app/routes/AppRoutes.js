import { Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import CandidateRoutes from "./CandidateRoutes";
import ElectionRoute from "./ElectionRoute";
import VoterRoutes from "./VoterRoutes";

function AppRoutes() {
  return (
    <Route>
      {/* <AuthRoutes /> */}
      <ElectionRoute />
      {/* <CandidateRoutes />
      <VoterRoutes /> */}
    </Route>
  );
}

export default AppRoutes;
