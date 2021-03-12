const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const loadData = async url => {
  let response = null;
  try {
    response = await fetch(`${API_URL}${url}`);
    return response.json();
  } catch (err) {
    console.error(err);
  }
  return response;
};

const apiService = () => {
  const search = async queryValue => await loadData(`/items?q=${queryValue}`);
  const getProductDetail = async id => await loadData(`/items/${id}`);

  return {
    search,
    getProductDetail
  };
};

export const ApiService = apiService();
