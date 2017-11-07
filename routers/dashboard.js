const express = require('express')
const router  = express.Router()

//----------------------
// READ
//----------------------

router.get('/', function(req,res){
  res.render('dashboard')
})

router.get('/post', function(req,res){
  res.render('post')
})

//----------------------
// UPDATE
//----------------------

router.get('/post/edit',function(req,res){
  res.render('editPost')
})

//----------------------
// CREATE
//----------------------

router.get('/post/add', function(req,res){
  res.render('addPost')
})

router.post('/post/add', function(req,res){
  res.send(req.body)
})


module.exports = router
