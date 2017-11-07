const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const index = require('./routers/index');
const user = require('./routers/users');
const register = require('./routers/register');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');

//ROUTE
app.use('/', index);
app.use('/', user);
app.use('/', register);


app.listen(3000,(err)=>{
  if(!err){
    console.log('Jalan di port 3000');
  } else {
    console.log(err);
  }
})
