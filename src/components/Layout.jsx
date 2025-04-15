import { Outlet } from "react-router-dom";
import '../index.css'

function Layout () {
  return (
    <div>
        {/* This outlet will render any child route components - Header, nav, footer, etc */}
        <Outlet />
    </div>
  );
}

export default Layout;