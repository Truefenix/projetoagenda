const Contato = require('../models/ContatoModel');

exports.index = function(req, res) {
    res.render('contato');
};

exports.register = async function(req, res) {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back')); // salva e redireciona na mesma página
            return;
        }

        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`)); // salva e redireciona para o id do BD
        return;
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = function(req, res) {
    if(!req.params.id) return res.render('404');
    res.send(req.body);
};
