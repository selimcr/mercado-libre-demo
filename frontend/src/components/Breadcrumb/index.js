/* eslint-disable react/jsx-no-target-blank */

import React from "react";

// Local imports
import "./Breadcrumb.scss";

class Breadcrumb extends React.Component {

  render() {
    const { items } = this.props;
    let latest;
    let previousItems;
    if (items.length > 0) {
      latest = items[items.length - 1];
      if (items.length > 1) {
        previousItems = items.slice(0, items.length - 1);
      }
    }

    return (
      <div className="breadcrumb">
        {previousItems && (
          previousItems.map(item =>
            <span>{item} &gt; </span>
          )
        )}
        <span className="latest">{latest}</span>
      </div>
    );
  }
}

export default Breadcrumb;
