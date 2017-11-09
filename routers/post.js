const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/details/:link', (req, res) => {
  models.Post.findOne(
  {
    where: {
      link: req.params.link
    },
    include: models.Category
  })
  .then(dataPost => {
    // res.send(dataPost)
    if(dataPost){
      res.render('article-page',{dataPost:dataPost,loginStatus:req.session.loggedIn,username:req.session.username, user_id:req.session.user_id})
    } else {
      res.render('404-article',{loginStatus:req.session.loggedIn,username:req.session.username, user_id:req.session.user_id})
    }
  })
  .catch( err => {
    console.log(err);
    res.send(err)
  })
})

module.exports = router
