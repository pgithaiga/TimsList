var mongoose = require('mongoose');
var data = require('./../data/schema_models');
var User = data.User;
var passport = require('passport');
var passwordHash = require('password-hash');
var controller = {};

/*get signup page*/

controller.newUser = function(req,res){
   res.redirect('/'); 
}

/* post Sign Up for timsList. */
controller.addUser = function(req,res){  
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email + "@mit.edu";
  var phoneNumber = req.body.phoneNumber; 
  var password = req.body.password;
  var password_confirmation = req.body.password_confirmation;
  var hashedPassword = passwordHash.generate(password);//generates a hashed password


  User.findOne({email: email}, function(err, user){ //check that the user doesn't exist
    if (user){     
       res.redirect('/'); 

    }else if(password!==password_confirmation){      
       res.redirect('/'); 
      return;
    } else {
      var newuser = new User({//create user
        firstName:firstName,
        lastName : lastName,
        email: email,
        phoneNumber:phoneNumber,
        password: hashedPassword,
        activePosts:[],
        claimedPosts:[],
        favoriteTagsList:[],
        ratingsList:[]      
      });     
     
      newuser.save(function(err, newuser){        
        if (err){          
          res.send('Failed to create an account for ' + firstName);
        } else {
          req.session.user = newuser;                             
          res.redirect('/');
        }
      });
    }
  })
};

//GET logout
controller.logout = function(req,res){
  req.session.destroy();  
  res.redirect('/'); 
};

/* POST Login page. */
controller.login = function(req, res){  
  var email = req.body.email + "@mit.edu";
  var password = req.body.password;
  User.findOne({email: email}, function(err, user){ 
  console.log(user); 
    if (user && (passwordHash.verify(password,user.password))){//compares the given password to the hashed password
      req.session.user = user; 
      res.redirect('/');     
    } else {              
      res.json({message:"unsuccessful login"}); 
    }
  })
};

module.exports = controller;