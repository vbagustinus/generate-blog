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
      res.render('article-page',{dataPost:dataPost})
    } else {
      res.render('404-article')
    }
  })
  .catch( err => {
    console.log(err);
    res.send(err)
  })
})

module.exports = router
