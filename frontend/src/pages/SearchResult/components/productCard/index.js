// Node_modules
import React from "react";
import { withRouter } from "react-router-dom";

// Local imports
import "./ProductCard.scss";
import freeShippingLogo from "../../../../assets/ic_shipping.png";


class ProductCard extends React.Component {

  render() {
    const { product } = this.props;
    const price = product.price.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    return (
      <div className="product-card">
        <div className="img-container">
          <a href={`/items/${product.id}`}>
            <img alt={product.title} src={product.picture} />
          </a>
        </div>
        <div className="details">
          <>
          <div className="product-header">
            <div className="price">
              {product.price.currency} {price}
              {product.free_shipping && (
                <img alt="Free Shipping" src={freeShippingLogo} className="free-shipping-logo" />
              )}
            </div>
            <div className="state">
              {product.state}
            </div>
          </div>
          <div className="content">
            <p><a href={`/items/${product.id}`}>{product.title}</a></p>
            <p>{product.condition}</p>
          </div>
          </>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductCard);