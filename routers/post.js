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
    res.render('aticle-page',{dataPost:dataPost})
  })
  .catch( err => {
    res.send(err)
  })
})

module.exports = router
