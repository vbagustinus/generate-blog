const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const index = require('./routers/index');
const login = require('./routers/login');
const register = require('./routers/register');
const post = require('./routers/post');
const dashboard = require('./routers/dashboard')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'))
app.use(session({
  secret: 'generate-blog'
}))

app.set('view engine', 'ejs');

//ROUTE
app.use('/login', login);
app.use('/register', register);
app.use('/dashboard', dashboard)
app.use('/', index);
app.use('/post', post);
console.log('====',session.blog_name);
// app.use(`/${session.blog_name}`);

app.listen(3000,(err)=>{
  if(!err){
    console.log('Jalan di port 3000');
  } else {
    console.log(err);
  }
})
