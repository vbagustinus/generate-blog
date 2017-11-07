const express = require('express')
const router  = express.Router()
const models = require('../models');

//----------------------
// READ
//----------------------

router.get('/', function(req,res){
  res.render('dashboard')
})

router.get('/post/:id', function(req,res){
  models.Post.findAll(
    {
      where: {
        id: req.params.id
      }
    })
    .then(dataPosts=>{
      res.render('post',{dataPosts:dataPosts})
    })
    .catch(err=>{
      res.send(err)
    })
})

//----------------------
// UPDATE
//----------------------

router.get('/post/edit/:id',function(req,res){
  models.Post.findById(
    {
      where: req.params.id
    })
    .then(dataPost=>{
        res.render('editPost',{dataPost:dataPost})
    })
    .catch(err=>{
      res.send(err)
    })
})

//----------------------
// CREATE
//----------------------

router.get('/post/add', function(req,res){
  models.Category.findAll()
    .then(dataCategories=>{
      res.render('addPost',{dataCategories:dataCategories})
    })
    .catch(err=>{
      res.send(err)
    })
})

router.post('/post/add', function(req,res){
  let input = req.body
  models.Post.create(
    {
      title: input.title,
      article: input.article,
      date_publish: input.date_publish,
      category_name: input.category_name

    })
    .then(()=>{
      res.redirect('/post')
    })
    .catch(err=>{
      res.send(err)
    })
  // res.send(req.body)
})


module.exports = router
