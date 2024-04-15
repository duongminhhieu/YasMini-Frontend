import { Outlet } from "react-router-dom";
import AppHeader from "./layouts/AppHeader";
import AppFooter from "./layouts/AppFooter";

export default function App() {
  return (
    <>
      <AppHeader />

      <div>
        <Outlet />
      </div>

      <AppFooter />
    </>
  );
}
