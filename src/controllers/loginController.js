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
            req.session.save(function() {
                return res.redirect('back');
            });
            return;
        }
        return;
        // Se não houver erros, continue com o restante do código aqui...

    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};
