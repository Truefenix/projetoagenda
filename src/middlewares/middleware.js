exports.middlewareGlobal = (req, res, next) => {
    // flassh messages
    res.locals.errors = req.flash('errors', console.log('recebido o flash error'));
    res.locals.success = req.flash('success', console.log('recebido o flash success'));
    res.locals.user = req.session.user;
    next();
};
  
exports.outroMiddleware = (req, res, next) => {
    next();
};
  
exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
      return res.render('404');
    }
    next();
};
  
exports.csfrMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) { // se não estiver logado
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save(() => res.redirect('/')); // salva e redireciona o usuário
    return;
  }
  next();
};