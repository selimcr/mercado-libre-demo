// Node_modules
import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

// Local imports
import "./SearchResult.scss";
import { ApiService } from "../../services/apiService";
import Breadcrumb from "../../components/Breadcrumb";
import ProductCard from "./components/productCard";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productsLoaded: false };
  }

  async componentDidMount() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);    
    const queryValue = query.get("search");
    if (!queryValue) {
      window.location.href = "/";
    }
    await this.fetchData(queryValue);
  }

  fetchData = async queryValue => {
    const data = await ApiService.search(queryValue);
    this.setState({ data, queryValue, productsLoaded: true });
  }

  render() {
    const { data, productsLoaded, queryValue } = this.state;
    const mainSiteTitle = process.env.REACT_APP_SITE_TITLE || '';
    const title = `${mainSiteTitle} | Resultados para '${queryValue}'`;
    const description = "Encuentra en MercadoLibre.com.co! Entre y conozca nuestras increíbles ofertas y promociones. Descubre la mejor forma de comprar online.";
    const helmet = <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </Helmet>;
    if (productsLoaded) {
      return (
        <>
        {helmet}
        <Breadcrumb items={data.categories} />
        <section className="searchResult">
          {data && (
            data.items.map(item =>
              <ProductCard key={item.id} product={item} />
            )
          )}
        </section>
        </>
      );
    } else {
      return (
        <div>
          {helmet}
        </div>
      );
    }
  }
}

export default withRouter(SearchResult);