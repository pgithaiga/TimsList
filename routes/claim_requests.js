// Routes for Claim Request db logic

var express = require('express');
var models = require('../data/schema_models');
var router = express.Router();

// POST Create new Claim Request
router.post('/createClaim', function (req, res) {
  if (req.session.curr_user) {
  } 

  else {
    res.status(400).json({err: "Not logged in!"});
  }
});

// POST Delete claim request
router.post('deleteClaim', function (req, res) {
  if (req.session.curr_user) {

  } 

  else {
    res.status(400).json({err: "Not logged in!"});
  }
}); 