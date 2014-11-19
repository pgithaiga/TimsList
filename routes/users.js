var express = require('express');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var controller=require('./../controllers/user');
var router = express.Router();
var data = require('./../data/schema_models');
var User = data.User;
var Post = data.Post;
var moment = require('moment');
var utils = require('../utils/utils');
var assert   = require('assert');

// Logout user
router.get('/logout',function(req,res){
  controller.logout(req,res);
});

// Sign in user
router.post('/signup',function(req,res){
  controller.addUser(req,res);
});

// Create a new user
router.get('/newUser',function(req,res){
  controller.newUser(req,res);
});

// Login user
router.post('/login',function(req,res){
  controller.login(req,res);
});

// GET all users
router.get('/', function(req, res) {
  User.find({}).exec(function (err, users) {
  	if (err) {
  		utils.sendErrResponse(res, 500, 'there was a problem getting the users');
  	} else {
  		utils.sendSuccessResponse(res, users);
  	}
  })
});

// GET all posts from user with id userId
router.get('/:userId/posts', function(req, res) {
	var userId = req.params.userId;

	User.findById(userId)
			.populate('activePosts')
			.exec(function(err, user) {
				if(err) {
					utils.sendErrResponse(res, 500, 'there was a problem getting user posts');
				} else {
					utils.sendSuccessResponse(res, user);
				}
			});
});

// GET all available posts from user with userid
router.get('/:userId/posts/available', function(req, res) {
	var userId = req.params.userId;
	var timeSort = req.query.time || 1;

	Post.find({author: userId, available: true})
			.sort({time: timeSort})
			.populate('author')
			.exec(function(err, posts) {
				if(err) {
					utils.sendErrResponse(res, 500, 'there was a problem getting Posts');
				} else {
					utils.sendSuccessResponse(res, posts);
				}
			});
});

// GET all posts claimed by user with userid
router.get('/:userId/posts/claims', function(req, res) {
	var userId = req.params.userId;
	var timeSort = req.query.time || 1;

	Post.find({claimer: userId})
			.sort({time: timeSort})
			.populate('author')
			.exec(function(err, posts) {
				if(err) {
					utils.sendErrResponse(res, 500, 'there was a problem getting Posts');
				} else {
					utils.sendSuccessResponse(res, posts);
				}
			});
});

// GET all claimed posts authored by user with userid
router.get('/:userId/posts/claimed', function(req, res) {
	var userId = req.params.userId;
	var timeSort = req.query.time || 1;

	Post.find({author: userId, claimer: {'$ne': null }})
			.sort({time: timeSort})
			.populate('claimer')
			.exec(function(err, posts) {
				if(err) {
					utils.sendErrResponse(res, 500, 'there was a problem getting Posts');
				} else {
					utils.sendSuccessResponse(res, posts);
				}
			});
});

// POST a new post 
router.post('/:userId/posts', function(req, res) {
	var userId =  req.params.userId;
	if (req.session.user._id == userId) {
		var name = req.body.name;
		var description = req.body.description;
		var initialPrice = parseInt(req.body.initialPrice);

		assert(name != '', "name must not be empty");
		assert(description != '', "description must not be empty");
		assert(initialPrice >= 0, "price must be more than 0");


		var post = new Post({
			author: userId,

		  name: name,
		  imageURLList: [],
		  tagList: [],
		  description: description,
		  initialPrice: initialPrice,

		  isAuctioningItem: false,
		  expirationDate: null,
		  currentAuctionPrice: null,  

		  timeCreated: moment().format(),
		  avaliable: true,
		  claimer: null
		});

		post.save(function(err, newPost) {
			if(err) {
				utils.sendErrResponse(res, 400, err);
			} else {
				utils.sendSuccessResponse(res, newPost);
			}
		});
	} else {
		utils.sendErrResponse(res, 403, 'not allowed!');
	}
	

});

// POST a new auctionable post 
router.post('/:userId/auctionablePosts', function(req, res) {
	var userId =  req.params.userId;
	var name = req.body.name;
	var description = req.body.description;
	var initialPrice = req.body.price;
	var expireDate = req.body.expireDate;

	var post = new Post({
		author: userId,

	  name: name,
	  imageURLList: [],
	  tagList: [],
	  description: description,
	  initialPrice: initialPrice,

	  isAuctioningItem: true,
	  expirationDate: expireDate,
	  currentAuctionPrice: initialPrice,  

	  timeCreated: moment().format(),
	  avaliable: true,
	  claimer: null
	});

	post.save(function(err, newPost) {
		if(err) {
			utils.sendErrResponse(res, 400, err);
		} else {
			utils.sendSuccessResponse(res, newPost);
		}
	});

});

// Update a user's post
router.put('/:userId/posts/:postId', function(req, res) {
	var userId = req.params.userId;
	if (req.session.user._id == userId) {
		var postId = req.params.postId;
		var name = req.body.name;
		var price = req.body.initialPrice;
		var description = req.body.description;

		assert(name != '', "name must not be empty");
		assert(description != '', "description must not be empty");
		assert(initialPrice >= 0, "price must be more than 0");

		Post.findByIdAndUpdate(postId, {name: name, initialPrice: price, description: description})
				.exec(function(err, post) {
					if (err) {
						utils.sendErrResponse(res, 400, 'there was a problem updating the post');
					} else {
						utils.sendSuccessResponse(res, post);
					}
				});
	} else {
		utils.sendErrResponse(res, 403, 'not allowed!');
	}
	
});


// DELETE a user's post
router.delete('/:userId/posts/:postId', function(req, res) {
	var userId = req.params.userId;
	if (req.session.user._id == userId) {
		var postId = req.params.postId;

		Post.findByIdAndRemove(postId, function (error) {
			if (error) {
				utils.sendErrResponse(res, 500, 'there was a problem deleting the post');
			} else {
				utils.sendSuccessResponse(res, 'post successfully deleted');
			}
		});
	} else {
		utils.sendErrResponse(res, 403, 'not allowed!');
	}
	
});

// POST a claim to a post with postid by user with userid
router.post('/:userId/posts/:postId/claim', function(req, res) {
	var userId = req.params.userId;
	if (req.session.user._id == userId) {
		var postId = req.params.postId;

		Post.find({_id: postId}).exec(function(err, post) {
			if (err) {
				utils.sendErrResponse(res, 500, 'there was problem getting the post');
			} else {
				if (post[0].available) {
					Post.findByIdAndUpdate(postId, {available: false, claimer: userId})
							.exec(function(error, claimedPost) {

								if (error) {
									utils.sendErrResponse(res, 500, 'there was a problem claiming the post');
								} else {
									utils.sendSuccessResponse(res, claimedPost);
								}
							})
				} else {
					utils.sendErrResponse(res, 400, 'the item has already been claimed');
				}
			}
		});
	} else {
		utils.sendErrResponse(res, 403, 'not allowed!');
	}
});

module.exports = router;
