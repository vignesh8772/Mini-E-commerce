const express=require('express');
const { createOrder } = require('../controllers/orderController');
const Router=express.Router();

Router.route('/order').post(createOrder);

module.exports =Router;