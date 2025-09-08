const express = require("express");
const { getProducts } = require("../controllers/productController");
const getsingleproduct= require("../controllers/singleproductgetoff")
const Router = express.Router();

Router.route("/product").get(getProducts);
Router.route("/products/:id").get(getsingleproduct);

module.exports = Router;
