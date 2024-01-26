exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('erro', console.log('recebido o flash')); // manda para todas as páginas a flash message.
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