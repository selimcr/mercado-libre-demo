// Node modules
import React from "react";

// Local imports
import "./Layout.scss";
import Header from "../Header";

export const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    <main className="container">
      <div className="inline-container">
        {children}
      </div>
    </main>
  </div>
);
