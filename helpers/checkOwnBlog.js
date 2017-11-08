function checkOwnBlog(req, res, next){
  if (`/${req.session.blog_name}`) {
    console.log();
      res.render('ownblog')
  }else{
    next()
  }
}

module.exports = checkOwnBlog;
