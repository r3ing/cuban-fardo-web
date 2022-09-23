import React from "react";
import { Helmet } from "react-helmet";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ children, title = "Cuban Fardo Express" }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Header />

      {children}

      <Footer/>
    </>
  );
}
