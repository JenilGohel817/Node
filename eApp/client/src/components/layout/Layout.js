import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta description={description} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="my-5">
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Ecom App",
  description: "Ecom App",
};

export default Layout;
