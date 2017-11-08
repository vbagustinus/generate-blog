const express = require('express')
const router = express.Router()
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');


// START DUMMY PAGE
router.get('/article-page',function(req,res){
  res.render('article-page')
})
// END DUMMY PAGE

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:blog_name', function(req,res) {
  // res.render('dashboard')
  if(req.params.blog_name == req.session.blog_name){
    res.render('dashboard', {session:req.params.blog_name,username:req.session.username, user_id:req.session.user_id})
  } else {
    models.User.findOne(
    {
      where : {
        blog_name: req.params.blog_name
      },
      include: [
      {
        model: models.Post,
      }],
      order: [
         [ models.Post, 'date_publish', 'ASC' ]
      ]
    })
    .then(dataPosts=>{
      if(!dataPosts){
        res.redirect('/register')
      } else {
        res.render('index', {dataPosts:dataPosts})
      }
    })
    .catch(err=>{
      console.log(err);
      res.send(err)
    })
  }

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

module.exports = router
