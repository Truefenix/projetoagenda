require('dotenv').config();

const express = require('express');
const app = express();

// Segurança
// const helmet = require('helmet');
// app.use(helmet());

const csfr = require('csurf');

// Banco de Dados
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING) // conexão do MongoDB
    .then(() => {
        console.log("Agora que a conexão chegou");
        app.emit('pronto'); // emite estou pronto para o app.
    })
    .catch((error) => {
        console.error("Erro ao conectar ao MongoDB:", error);
    });

// Express session e Flash messages
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const sessionOption = session({ // opçoes da session
    secret: 'aaa', // dados
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }), // conexao mongoDB
    resave: false,
    saveUninitialized: false,
    cookie: { // diz quanto tempo o cookie vai durar
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias por milésimos de seg.
        httpOnly: true
    }
});
app.use(sessionOption);
app.use(flash());

// Rotas do servidor
const routes = require('./routes');
const path = require('path');
const {middlewareGlobal, checkCsrfError, csfrMiddleware} = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true })); // ler o req.body

// View
app.use(express.static(path.resolve(__dirname, 'public'))); // arquivos estáticos.
app.set('views', path.resolve(__dirname, 'src', 'views')); // setar o caminho de view.
app.set('view engine', 'ejs'); // renderiza pelo ejs.

// CSFR
app.use(csfr());

// middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csfrMiddleware);
app.use(routes); // executa rotas.

app.on('pronto', () => { // executa depois do banco dedados
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor sendo executado na porta 3000');
    });
});