import React from "react";
import Head from "next/head";
import MyNavbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Stories App</title>
      </Head>
      <MyNavbar />
      <div className="container">{children}</div>
    </React.Fragment>
  );
};
export default Layout;
