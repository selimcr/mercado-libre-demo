const API_URL = "https://api.mercadolibre.com";

const fetch = require("node-fetch");

ApiService = function() {
  this.search = async queryValue => {
    const searchResponse = await this.loadData(`/sites/MLA/search?q=${queryValue}`);
    const resultsCategories = searchResponse.results.map(result => result['category_id']);
    const sortedCategories = this.sortObject(this.countUnique(resultsCategories));
    const mainCategoryId = sortedCategories ? sortedCategories[0][0] : [];
    const categoryFilter = searchResponse.filters.filter(filter => filter.id === "category");
    let categoriesList = [];
    if (categoryFilter.length > 0) {
      const category = categoryFilter[0].values.filter(cat => cat.id === mainCategoryId)[0];
      categoriesList = category['path_from_root'].map(cat => cat.name);
    } else {
      const categoryAvailableFilters = searchResponse['available_filters'].filter(filter => filter.id === "category");
      categoriesList = [categoryAvailableFilters[0].values[0].name];
    }
    const currenciesIds = searchResponse.results.slice(0, 4).map(item => item['currency_id']);
    const currencies = [];
    for (let i = 0; i < currenciesIds.length; i++) {
      const id = currenciesIds[i];
      if (!currencies[id]) {
        currencies[id] = await this.getCurrencyDetail(id)
      }
    }
    
    const items = searchResponse.results.slice(0, 4).map(item => {
      const currency = currencies[item['currency_id']];
      const convertedItem = {
        id: item.id,
        title: item.title,
        price: {
          amount: item.price,
          currency: currency.symbol,
          decimals: currency['decimal_places']
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping['free_shipping'],
        state: item['seller_address'].state.name
      };
      return convertedItem;
    });

    return {
      items: items,
      categories: categoriesList
    }
  };

  this.getProductDetail = async id => {
    const productResponse = await this.loadData(`/items/${id}`);
    const productDescriptionResponse = await this.loadData(`/items/${id}/description`);
    const currencyId = productResponse['currency_id'];
    const currency = await this.getCurrencyDetail(currencyId);
    const categoryId = productResponse['category_id'];
    const categoriesResponse = await this.getCategoryDetail(categoryId);
    const categories = categoriesResponse['path_from_root'].map(cat => cat.name);
    const product = {
      id: productResponse.id,
      title: productResponse.title,
      price: {
        amount: productResponse.price,
        currency: currency.symbol,
        decimals: currency['decimal_places']
      },
      picture: productResponse.pictures[0].url,
      condition: productResponse.condition,
      free_shipping: productResponse.shipping['free_shipping'],
      sold_quantity: productResponse['sold_quantity'],
      description: productDescriptionResponse['plain_text'],
      state: productResponse['seller_address'].state.name,
      categories: categories
    };
    return product;
  }

  this.getCurrencyDetail = async id => {
    return await this.loadData(`/currencies/${id}`);
  }

  this.getCategoryDetail = async id => {
    return await this.loadData(`/categories/${id}`);
  }

  this.loadData = async url => {
    let response = null;
    try {
      response = await fetch(`${API_URL}${url}`);
      return response.json();
    } catch (err) {
      console.error(err);
    }
    return response;
  }

  this.countUnique = arr => {
    const counts = {};
    for (var i = 0; i < arr.length; i++) {
       counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    };

    return counts;
  };

  this.sortObject = obj => {
    const items = Object.keys(obj).map(function(key) {
      return [key, obj[key]];
    });
    items.sort(this.sortCategory);
    return items;
  }

  this.sortCategory = (first, second) => {
    return second[1] - first[1];
  }
}

exports.ApiService = ApiService;
