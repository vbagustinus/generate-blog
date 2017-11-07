const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const index = require('./routers/index');
const login = require('./routers/login');
const register = require('./routers/register');
const post = require('./routers/post');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

//ROUTE
app.use('/login', login);
app.use('/register', register);
app.use('/', index);
app.use('/post', post);

app.listen(3000,(err)=>{
  if(!err){
    console.log('Jalan di port 3000');
  } else {
    console.log(err);
  }
})
