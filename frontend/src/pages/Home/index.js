// Node_modules
import React from "react";
import { Helmet } from "react-helmet";

// Local imports
import "./Home.scss";

export const Home = () => {

  return (
    <div className="home">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Mercado Libre</title>
          <meta name="description" content="La comunidad de compra y venta online más grande de América Latina." data-head-react="true"></meta>
      </Helmet>
    </div>
  );
};
