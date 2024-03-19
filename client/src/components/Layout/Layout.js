import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div>
      <Header></Header>
      <main style={{ minHeight: "90vh" }}>{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
