import { Route } from "react-router-dom";
import { AddUser, List, UpdateUser } from "../../components";

function CandidateRoutes() {
  return (
    <Route path="/candidates">
      <Route
        index
        element={
          <List title={"Candidates List"} route="user/candidate" type=""></List>
        }
      />
      <Route
        path="add"
        element={<AddUser heading="Candidate" type="candidate"></AddUser>}
      />
      <Route path="update/:id" element={<UpdateUser heading="Candidate" />} />
    </Route>
  );
}

export default CandidateRoutes;
