// Layout.jsx
import React from "react";
import Footer from "./Footer";

const Layout = ({ children, showFooter }) => {
  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
