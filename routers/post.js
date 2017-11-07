const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/', (req, res) => {
  res.render('post')
})

module.exports = router
