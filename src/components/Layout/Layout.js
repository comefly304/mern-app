import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="layout">
       <Toaster/>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
