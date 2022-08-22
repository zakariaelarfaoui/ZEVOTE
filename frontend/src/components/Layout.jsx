import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

function Layout() {
  return (
    <main className="App">
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
