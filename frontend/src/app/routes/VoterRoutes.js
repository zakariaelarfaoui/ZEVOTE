import { Route } from "react-router-dom";
import { AddUser, List, UpdateUser } from "../../components";

function VoterRoutes() {
  return (
    <Route path="/voters">
      <Route
        index
        element={<List title={"Voters List"} route="user/voter"></List>}
      />
      <Route
        path="add"
        element={<AddUser heading="Voter" type="voter"></AddUser>}
      />
      <Route path="update/:id" element={<UpdateUser heading="Voter" />} />
    </Route>
  );
}

export default VoterRoutes;
