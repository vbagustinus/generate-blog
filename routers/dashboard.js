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
      UserId: req.params.id
    }
  })
  .then(dataPosts => {
    // console.log(dataPosts);
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
  models.Post.findById(req.params.id)
  .then(dataPost=>{
    // res.send(dataPost);
      res.render('editPost',{dataPost:dataPost, username:req.session.username, user_id:req.session.user_id})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/post/edit/:id', function(req,res){
  models.post.update({
    title : req.body.title,
    article : req.body.article,
    date_publish: new Date(),
    link: setlink,
    UserId: req.session.user_id
  },{
    where : {
      id : req.params.id
    }
  }).then(function(){
    res.redirect('../dashboard')
  }).catch(function(err){
    console.log(err);
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
  // res.send(input)
  let setlink = input.title.split(' ').join('-').toLowerCase()
  models.Post.create(
  {
    title: input.title,
    article: input.article,
    date_publish: new Date(),
    link: setlink,
    UserId: req.session.user_id
  })
  .then((post)=>{
    let newData = input.category_name.map(dataId =>{
      return new Promise(function(resolve, reject) {
        models.Post_Category.create(
        {
          CategoryId: +dataId,
          PostId: post.id
        })
        resolve()
      });
    })
    console.log('Masuk');
    Promise.all(newData)
    .then(()=>{
      res.redirect('/dashboard')
    })
  })
  .catch(err=>{
    console.log(err);
    res.send(err)
  })
})


//----------------------
// DELETE
//----------------------

router.get('/delete/:id', function(req,res){
  models.Post.destroy({
    where : {
      id : req.params.id
    }
  }).then(function(){
    res.redirect('../dashboard')
  }).catch(function(err){
    console.log(err);
  })
})


module.exports = router
