import React from "react";
import Navbar from "./header/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
    </>
  );
};

export default Layout;
