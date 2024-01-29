const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// Rotas da home
route.get('/', homeController.index);

// Rota do formulário de entrada
route.get('/login/index', loginController.index);

// Rota de registro
route.post('/login/register', loginController.register);

// Rota de login
route.post('/login/login', loginController.login);

// Rota de saida
route.get('/login/logout', loginController.logout);

module.exports = route;