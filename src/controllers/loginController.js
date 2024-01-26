const Login = require('../models/LoginModel');

// GET login
exports.index = (req, res) => {
    res.render('login');
};

// PUT register do form
exports.register = async function(req, res) {
    try {
    const login = new Login(req.body); // instânciar class
    await login.register(); // validação do body

    if(login.errors.lenght > 0) {
        req.flash('erro', login.errors);
        req.session.save(function() {
            return res.redirect('back');
        });
        return;
    }
    return res.send(login.errors);

    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};
