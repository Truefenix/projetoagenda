const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');

// Rotas da home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

module.exports = route;