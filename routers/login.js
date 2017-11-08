const express = require('express')
const router = express.Router()
const models = require('../models');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', function(req, res){
  models.User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(function(user){
    if(user){
      bcrypt.compare(req.body.password, user.password).then(function(result) {
        if (result) {
          req.session.loggedIn = true
          req.session.username = user.getFullName()
          req.session.user_id = user.id
          console.log('----',req.session);
          res.redirect('/dashboard')
        } else {
          res.render('login', {error: true})
        }
      })
    } else {
      res.render('login', {error: true})
    }
  })
  .catch(err=>{
    console.log(err);
  })
})

module.exports = router
