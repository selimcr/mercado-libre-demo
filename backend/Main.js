/*
 *
 */

const express = require("express");
const cors = require('cors');
const app = express();
const path = require("path");
const PORT = 5000;

const ApiService = require('./services/apiService').ApiService;
const apiService = new ApiService();

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get('/api/items', async (req, res) => {
  
  const query = req.query.q;
  let items = [];
  let categories = [];
  if (query) {
    const searchResponse = await apiService.search(query);
    items = searchResponse.items;
    categories = searchResponse.categories;
  }
  const data = {
    "author": {
      "name": "Selim",
      "lastname": "Diaz"
    },
    categories: categories,
    items: items
  };
  res.send(data);
});

app.get('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  const item = await apiService.getProductDetail(id);
  const data = {
    "author": {
      "name": "Selim",
      "lastname": "Diaz"
    },
    item: item
  };
  res.send(data);
});

app.listen(PORT);