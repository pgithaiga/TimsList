var express = require('express');
var router = express.Router();
var data = require('../data/schema_models');
var Post = data.Post;
var User = data.User;
var utils = require('../utils/utils');

// GET all posts from all users
router.get('/', function(req, res) {
	var timeSort = req.query.time || 1;

	Post.find({})
			.sort({time: timeSort})
			.exec(function(err, posts) {
				if(err) {
					utils.sendErrResponse(res, 500, 'there was a problem getting Posts');
				} else {
					utils.sendSuccessResponse(res, posts);
				}
			});
});

// GET all available posts
router.get('/available', function(req, res) {
	var timeSort = req.query.time || 1;

	Post.find({available: true })
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

// GET post with id postId
router.get('/:postId', function(req, res) {
	var postId = req.params.postId;

	Post.findById(postId, function (err, post) {
		if (err) {
			utils.sendErrResponse(res, 500, 'there was a problem getting the post');
		} else {
			utils.sendSuccessResponse(res, post);
		}
	});
});

// POST Create new auction request
router.post('/:postId/bid', function (req, res) {
	var postId = req.params.postId;
	var currentUser = req.params.curr_user;
	var requestedPrice = req.params.requestedPrice;
	var timeReceived = new Date();

	if (currentUser) {
		Post.findById(postId) 
			.exec(function(err, post) {
				if (err) {
					utils.sendErrResponse(res, 500, 'there was a problem getting the post');
				} else {
					if (post.avaliable && post.isAuctioningItem && post.expirationDate  < timeReceived) {
						// Varios reasons the current bid was not valid

						res.status(400).json({err: "Item not avaliable for bid"});
					} else if(requestedPrice > post.currentAuctionPrice) {
						// Price was high enough and before expiration date
						post.currentAuctionPrice = requestedPrice;
						post.claimer = currentUser;

						post.save(function(err, newPost) {
							if(err) {
								utils.sendErrResponse(res, 400, err);
							} else {
								utils.sendSuccessResponse(res, newPost);
							}
						});

					} else {
						// Price was not high enough so the bid did not go through
						utils.sendSuccessResponse(res, post);

					}
				}
		});

	} else {
		res.status(400).json({err: ""});
	}
});

module.exports = router;
