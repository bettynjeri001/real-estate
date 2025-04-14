import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  // Optional: For a dark mode toggle state, you can manage it here and pass down as props
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="min-h-screen">
        {/* This outlet will render any child route components */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
