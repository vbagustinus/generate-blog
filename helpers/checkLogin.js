function checkLogin(req, res, next){
  if (req.session.loggedIn && req.session.blog_name) {
    next()
  }else{
    res.redirect('/login')
  }
}

module.exports = checkLogin;
