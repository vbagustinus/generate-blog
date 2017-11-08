const express = require('express')
const router  = express.Router()
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');

//----------------------
// READ
//----------------------

router.get('/', checkLogin ,function(req,res){
  res.render('dashboard', {username:req.session.username, user_id:req.session.user_id})
})

router.get('/post/:id', checkLogin ,function(req,res){
  models.Post.findAll(
  {
    where: {
      id: req.params.id
    }
  })
  .then(dataPosts => {
    res.render('dashboardPost',{dataPosts:dataPosts,username:req.session.username, user_id:req.session.user_id})
  })
  .catch( err => {
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
      res.render('editPost',{dataPost:dataPost, username:req.session.username, user_id:req.session.user_id})
  })
  .catch(err=>{
    res.send(err)
  })
})

//----------------------
// CREATE
//----------------------

router.get('/addpost', function(req,res){
  models.Category.findAll()
  .then(dataCategories=>{
    res.render('addPost',{dataCategories:dataCategories,username:req.session.username, user_id:req.session.user_id})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/addpost', function(req,res){
  let input = req.body
  let setlink = input.title.split(' ').join('-').toLowerCase()

  models.Post.create(
  {
    title: input.title,
    article: input.article,
    date_publish: new Date(),
    category_name: input.category_name,
    link: setlink,
    UserId: req.session.user_id
  })
  .then((post)=>{
    let newdata = input.category_name.map(dataId =>{
      return new Promise(function(resolve, reject) {
        models.Post_Category.create(
        {
          CategoryId: +dataId,
          PostId: post.id
        })
        resolve()
      });
    })
    Promise.all(newData)
    .then(()=>{
      res.redirect('/dashboardPost',{dataPosts:dataPosts,username:req.session.username, user_id:req.session.user_id})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})


module.exports = router
