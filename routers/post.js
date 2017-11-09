const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/details/:link', (req, res) => {
  models.Post.findOne(
  {
    where: {
      link: req.params.link
    },
    include: models.Category
  })
  .then(dataPost => {
    // res.send(dataPost)
    if(dataPost){
      res.render('article-page',{categories:'',dataPost:dataPost,blogName:req.params.blog_name,session:req.params.blog_name,loginStatus:req.session.loggedIn,username:req.session.username, user_id:req.session.user_id})
    } else {
      res.render('404-article',{categories:'',loginStatus:req.session.loggedIn,blogName:req.params.blog_name,session:req.params.blog_name,username:req.session.username, user_id:req.session.user_id})
    }
  })
  .catch( err => {
    console.log(err);
    res.send(err)
  })
});

router.get('/category/:id/:category', (req, res)=>{
  models.User.findOne(
  {
    where: {
      id: req.params.id
    },
    include: [
      {
        model: models.Post,
        include: [
          {
            model: models.Category,
            where :{
              category_name:req.params.category
            }
          }]
      }]
  })
  .then(posts=>{
    models.User.findOne(
    {
      where : {
        id: req.params.id
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
        if(posts){
          res.render('indexCategory', {dataPosts:posts,categories:categories,blogName:req.params.blog_name,session:req.params.blog_name,loginStatus:req.session.loggedIn,username:req.session.username, user_id:req.session.user_id})
        } else {
          res.send('posts tidak ada')
        }
      }
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router
