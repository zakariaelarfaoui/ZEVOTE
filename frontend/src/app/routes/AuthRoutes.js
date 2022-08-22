import { Route } from "react-router-dom";
import { Login, Register } from "../../pages";

const AuthRoutes = () => (
  <>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </>
);

export default AuthRoutes;
