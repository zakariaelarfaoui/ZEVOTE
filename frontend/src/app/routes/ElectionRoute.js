import { Route } from "react-router-dom";
import { AddElection, List, UpdateElection } from "../../components";

const ElectionRoute = () => (
  <Route path="/elections">
    <Route
      index
      element={<List title={"Elections List"} route="election"></List>}
    />
    <Route
      path="add"
      element={<AddElection heading="Election"></AddElection>}
    />
    <Route path="update/:id" element={<UpdateElection heading="Election" />} />
  </Route>
);

export default ElectionRoute;
