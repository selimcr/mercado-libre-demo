// Node_modules
import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

// Local imports
import "./ProductView.scss";
import { ApiService } from "../../services/apiService";
import Breadcrumb from "../../components/Breadcrumb";

class ProductView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { infoLoaded: false };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (!id) {
      window.location.href = "/";
    }
    await this.fetchData(id);
  }

  fetchData = async id => {
    const data = await ApiService.getProductDetail(id);
    this.setState({ data, infoLoaded: true });
  }

  render() {
    const { data, infoLoaded } = this.state;

    if (infoLoaded) {
      const price = data.item.price.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      const initialAmount = price.split(".")[0];
      const decimals = price.split(".")[1];

      const title = `${data.item.title} | Mercado Libre`;
      const description = "Cómpralo en Mercado Libre. Encuentra más productos de Celulares y Teléfonos, Celulares y Smartphones.";
      const helmet = <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </Helmet>;
      return (
        <>
        {helmet}
        <Breadcrumb items={data.item.categories} />
        <section className="product">
          <div className="img-container">
            <img alt={data.item.title} src={data.item.picture} />
          </div>
          <div className="details">
            <div className="condition">
              {data.item.condition} - {data.item.sold_quantity} vendidos
            </div>
            <div className="title">
              {data.item.title}
            </div>
            <div className="price">
              {data.item.price.currency} {initialAmount} <span className="decimals">{decimals}</span>
            </div>
            <button>Comprar</button>
          </div>

          <div className="description">
            <div className="title">
              Descripción del producto
            </div>
            <p>
              {data.item.description}
            </p>
          </div>
        </section>
        </>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default withRouter(ProductView);