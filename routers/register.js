const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/',(req, res) => {
  res.send(req.body)
  let input = req.body
  User.create(
  {
    first_name: input.first_name,
    last_name: input.last_name,
    username: input.username,
    password: input.password,
    email: input.email,
    gender: input.gender
  })
  .then(() => {
    res.redirect('/login')
  })
  .catch(err => {
    res.render('register')
  })
})

module.exports = router
