import React from "react";
import Navbar from "./header/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <>{children}</>
    </>
  );
};

export default Layout;
