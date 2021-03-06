const express = require('express')
const router = express.Router()
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');

// START DUMMY PAGE
router.get('/article-page',function(req,res){
  res.render('article-page')
})
router.get('/404',function(req,res){
  res.render('404')
})
// END DUMMY PAGE

router.get('/', (req, res) => {
  res.render('login')
})

router.get('/:blog_name', function(req,res) {
  if(req.session.blog_name==req.params.blog_name){
    res.render('dashboard',{blogName:req.params.blog_name,session:req.params.blog_name,username:req.session.username, user_id:req.session.user_id})
  }
  res.redirect(`/${req.params.blog_name}/posts`)
})


router.get('/:blog_name/posts', function(req,res) {
  models.User.findOne(
  {
    where : {
      blog_name: req.params.blog_name
    },
    include: [
    {
      model: models.Post,
      include: [
        {
          model: models.Category
        }]
    }],
    order: [
       [ models.Post, 'date_publish', 'ASC' ]
    ]
  })
  .then(dataPosts=>{
    if(!dataPosts){
      res.render('404',{categories:'',loginStatus:req.session.loggedIn,blogName:req.params.blog_name,session:req.params.blog_name,username:req.session.username, user_id:req.session.user_id})
    } else {
      let datacategories = []
      dataPosts.Posts.map(post=>{
        post.Categories.map(category=>{
          if(category){
            datacategories.push(category.category_name)
          }
        })
      })
      var categories = [];
      datacategories.forEach(function(item) {
           if(categories.indexOf(item) < 0) {
               categories.push(item);
           }
      });
      res.render('index', {dataPosts:dataPosts,categories:categories,blogName:req.params.blog_name,session:req.params.blog_name,loginStatus:req.session.loggedIn,username:req.session.username, user_id:req.session.user_id})
    }
  })
  .catch(err=>{
    console.log(err);
    res.send(err)
  })
})
router.get('/:blog_name/post/:id', checkLogin ,function(req,res){
  models.Post.findAll(
  {
    where: {
      UserId: req.params.id
    }
  })
  .then(dataPosts => {
    res.render('dashboardPost',{dataPosts:dataPosts,session:req.params.blog_name,username:req.session.username, user_id:req.session.user_id})
  })
  .catch( err => {
    res.send(err)
  })
})

//----------------------
// UPDATE
//----------------------

router.get('/:blog_name/post/edit/:id',function(req,res){
  models.Post.findById(req.params.id)
  .then(dataPost=>{
      res.render('editPost',{dataPost:dataPost, session:req.params.blog_name,username:req.session.username, user_id:req.session.user_id})
  })
  .catch(err=>{
    res.send(err)
  })
})
router.post('/:blog_name/post/edit/:id', function(req,res){
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

router.get('/:blog_name/addpost', function(req,res){
  models.Category.findAll()
  .then(dataCategories=>{
    res.render('addPost',{dataCategories:dataCategories,session:req.params.blog_name,username:req.session.username, user_id:req.session.user_id})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/:blog_name/addpost', function(req,res){
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
    Promise.all(newData)
    .then(()=>{
      res.redirect('/'+req.session.blog_name)
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

//----------------------
// USER | PROFILE PAGE
//----------------------
router.get('/:blog_name/user/:id', function(req,res){
  models.User.findById(req.params.id).then(function(rows){
    // res.send(rows)
    res.render('dashboard-user',{data_User:rows,blogName:req.params.blog_name,session:req.params.blog_name,username:req.session.username, user_id:req.session.user_id})
  }).catch(function(err){
    if(err){console.log(err);}
  })
})

router.get('/:blog_name/user/delete/:id', function(req,res){
  models.User.destroy({
    where : {
      id : req.params.id
    }
  }).then(function(){
    req.session.destroy(()=>{
      console.log('----------------------------THE END-------------------------------------------------');
      console.log('Anda keluar')
    })
    res.redirect('../../register')
  }).catch(function(err){
    if(err){console.log(err);}
  })
})

//----------------------
// USER | SETTING PAGE
//----------------------

router.get('/:blog_name/user/setting/:id', function(req,res){
  models.User.findById(req.params.id).then(function(rows){
    // res.send(rows)
    res.render('dashboard-setting',{data_User:rows,blogName:req.params.blog_name,session:req.params.blog_name,username:req.session.username, user_id:req.session.user_id})
  }).catch(function(err){
    if(err){console.log(err);}
  })
})

router.post('/:blog_name/user/setting/:id', function(req,res){
  models.User.update({
    first_name : req.body.first_name,
    last_name  : req.body.last_name,
    username   : req.body.username,
    blog_name  : req.body.blog_name,
    gender     : req.body.gender,
    email      : req.body.email
  },{
    where : {
      id : req.params.id
    }
  }).then(function(){
    res.redirect(`/${req.params.blog_name}`)
  }).catch(function(err){
    if(err){console.log(err);}
  })
})



module.exports = router
