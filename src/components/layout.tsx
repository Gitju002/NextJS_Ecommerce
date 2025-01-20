import React from "react";
import Navbar from "./header/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 bg-gradient-to-br from-[#16153a] to-[#4b2c85]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
