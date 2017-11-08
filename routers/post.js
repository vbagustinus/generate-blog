const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/', (req, res) => {
  models.Post.findAll()
    .then(dataPosts => {
      res.render('index',{dataPosts:dataPosts})
    })
    .catch( err => {
      res.send(err)
    })
})

module.exports = router
