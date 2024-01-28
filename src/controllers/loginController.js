const Login = require('../models/LoginModel');

// GET login
exports.index = (req, res) => {
    res.render('login');
};

// PUT register do form
exports.register = async function(req, res) {
    try {
        const login = new Login(req.body); // instânciar a classe
        await login.register(); // validação do corpo (body)

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() { // salva a seção
                return res.redirect('back'); // retorna para a mesma página
            });
            return;
        }
        req.flash('success', 'Seu usuário foi criado com sucesso');
        req.session.save(function() {
            return res.redirect('back');
        });

        return;
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};
// PUT register do form
exports.login = async function(req, res) {
    try {
        const login = new Login(req.body); // instânciar a classe
        await login.login(); // validação do corpo (body)

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() { // salva a seção
                return res.redirect('back'); // retorna para a mesma página
            });
            return;
        }
        req.flash('success', 'Você entrou no sistema');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('back');
        });

        return;
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};
exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}
