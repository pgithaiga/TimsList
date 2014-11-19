var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  var user = req.session.user; 
  if(user){
    res.render('home',{title:'Home', user: user});
  } else{
    res.render('login',{title:'Home'});
  }
});

module.exports = router;
