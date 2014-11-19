// Mongoose Schemas for TimsList data models
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema ({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: {type: String, default: ""},
  password: {type: String},
  
  activePosts: [{type: Schema.Types.ObjectId, ref: 'Post', default:[]}],
  claimedPosts: [{type: Schema.Types.ObjectId, ref: 'Post', default:[]}],

  favoriteTagsList: [String],
  ratingsList: [Number],

});

var PostSchema = new Schema ({
  author: {type: Schema.Types.ObjectId, ref: 'User'},

  name: String,
  imageURLList: [String],
  tagList: [String],
  description: {type: String},
  initialPrice: {type: Number, default: 0},

  isAuctioningItem: {type: Boolean, default: false},
  expirationDate: {type: Date, default: null},
  currentAuctionPrice: {type: Number, default: 0},  

  timeCreated: {type: Date, default: Date.now()},
  available: {type: Boolean, default: true},
  claimer: {type: Schema.Types.ObjectId, ref: 'User', default: null}

});

var Post = mongoose.model('Post',PostSchema);
var User= mongoose.model('User', User);

module.exports.User = User;
module.exports.Post = Post;