const express = require('express')
const router = express.Router()

router.get('/',(req, res)=>{
  req.session.destroy(()=>{
    console.log('Anda keluar');
  });
  res.redirect('/login');
})

module.exports = router;
