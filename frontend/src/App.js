import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  // ElectionDetails,
  Layout,
  PersistLogin,
  RequireAuth,
} from "./components";
import { GlobalStyle, theme } from "./Global.styles";
import { Login } from "./pages";
import AddElection from "./pages/AddElection/AddElection";
import CastVote from "./pages/CastVote/CastVote";
import Dashboard from "./pages/Dashboard/Dashboard";
import ElectionDetails from "./pages/ElectionDetails/ElectionDetails";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {/* <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="vote/:electionId" element={<CastVote />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="add-election" element={<AddElection />} />
            <Route path="election/:id" element={<ElectionDetails />} />
          </Route> */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedUsers={["manager"]} />}>
              <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="add-election" element={<AddElection />} />
                <Route path="election/:id" element={<ElectionDetails />} />
              </Route>
            </Route>
            <Route element={<RequireAuth allowedUsers={["voter"]} />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="vote/:electionId" element={<CastVote />}></Route>
              </Route>
            </Route>
          </Route>
          {/* <Route path="/elections">
              <Route
                index
                element={
                  <List title={"Elections List"} route="election"></List>
                }
              />
              <Route
                path="add"
                element={<AddElection heading="Election"></AddElection>}
              />
              <Route
                path="update/:id"
                element={<UpdateElection heading="Election" />}
              />
              <Route
                path=":id"
                element={<ElectionDetails></ElectionDetails>}
              ></Route>
            </Route>
            <Route path="/candidates">
              <Route
                index
                element={
                  <List
                    title={"Candidates List"}
                    route="user/candidate"
                    type=""
                  ></List>
                }
              />
              <Route
                path="add"
                element={
                  <AddUser heading="Candidate" type="candidate"></AddUser>
                }
              />
              <Route
                path="update/:id"
                element={<UpdateUser heading="Candidate" />}
              />
            </Route>
            <Route path="/voters">
              <Route
                index
                element={<List title={"Voters List"} route="user/voter"></List>}
              />
              <Route
                path="add"
                element={<AddUser heading="Voter" type="voter"></AddUser>}
              />
              <Route
                path="update/:id"
                element={<UpdateUser heading="Voter" />}
              />
            </Route>
            <Route path="result">
              <Route index element></Route>
            </Route> */}
          {/* </Route> */}
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
