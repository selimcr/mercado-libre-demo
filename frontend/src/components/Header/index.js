/* eslint-disable react/jsx-no-target-blank */

import React from "react";
import { withRouter } from "react-router-dom";

// Local imports
import "./Header.scss";
import defaultLogo from "../../assets/Logo_ML.png";
import searchIcon from "../../assets/ic_Search.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
  }

  async componentDidMount() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);    
    const queryValue = query.get("search");
    this.searchInput.current.value = queryValue;
  }

  onSearchClick = () => {
    this.doSearch();
  };

  onKeyPress = e => {
    // If press Enter key
    if (e.charCode === 13) {
      this.doSearch();
    }
  }

  doSearch() {
    const searchValue = this.searchInput.current.value;
    if (searchValue) {
      window.location.href = `/items?search=${searchValue}`;
    }
  }

  render() {
    return (
      <header>
        <div className="container">
          <div className="inline-container header-inline-container">
            <a href="/">
              <img src={defaultLogo} alt="Mercado Libre" />
            </a>
            <div className="search-box">
              <input type="text" placeholder="Nunca dejes de buscar" onKeyPress={this.onKeyPress} ref={this.searchInput}/>
              <button onClick={this.onSearchClick}>
                <img src={searchIcon} alt="Search" className="search-button" />
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
