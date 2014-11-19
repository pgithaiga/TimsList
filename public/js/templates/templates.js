function active_posts(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (userId, postsData) {
jade_mixins["active_post"] = function(loggedInUserId, author, postId, name, description, price, isAuctioningItem, expirationDate){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var editPostUrl = '/users/' + userId + '/posts' + postId
buf.push("<div class=\"post panel panel-info\"><div" + (jade.attr("id", postId, true, false)) + " class=\"panel-heading\">" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "<div class=\"pull-right\">$" + (jade.escape((jade_interp = price) == null ? '' : jade_interp)) + "</div></div><div style=\"display: none\" class=\"panel-body\"><div class=\"post-info-container\"><p>" + (jade.escape((jade_interp = description) == null ? '' : jade_interp)) + "</p><div class=\"pull-left text-info\">Sold by: " + (jade.escape((jade_interp = author.email) == null ? '' : jade_interp)) + "</div>");
if ( (loggedInUserId == author._id))
{
buf.push("<div class=\"post-edit pull-right\"><span" + (jade.attr("data-postid", "" + (postId) + "", true, false)) + " class=\"menu-delete-post glyphicon glyphicon-remove pull-right\"></span><span" + (jade.attr("data-name", "" + (name) + "", true, false)) + (jade.attr("data-description", '' + (description) + '', true, false)) + (jade.attr("data-price", '' + (price) + '', true, false)) + (jade.attr("data-postid", '' + (postId) + '', true, false)) + " class=\"menu-edit-post glyphicon glyphicon-pencil pull-right\"></span></div>");
}
buf.push("</div></div></div>");
};
// iterate postsData
;(function(){
  var $$obj = postsData;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["active_post"](userId, val.author, val._id, val.name, val.description, val.initialPrice, val.isAuctioningItem, val.expirationDate);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["active_post"](userId, val.author, val._id, val.name, val.description, val.initialPrice, val.isAuctioningItem, val.expirationDate);
    }

  }
}).call(this);
}.call(this,"userId" in locals_for_with?locals_for_with.userId:typeof userId!=="undefined"?userId:undefined,"postsData" in locals_for_with?locals_for_with.postsData:typeof postsData!=="undefined"?postsData:undefined));;return buf.join("");
}
function claimed(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (postsData) {
jade_mixins["claimed"] = function(postId, name, description, price, claimer){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"post panel panel-info\"><div" + (jade.attr("id", postId, true, false)) + " class=\"panel-heading\">" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "<div class=\"pull-right\">$" + (jade.escape((jade_interp = price) == null ? '' : jade_interp)) + "</div></div><div style=\"display: none\" class=\"panel-body\"><div class=\"post-info-container\"><p>" + (jade.escape((jade_interp = description) == null ? '' : jade_interp)) + "</p><div class=\"pull-left text-info\">Claimed by: " + (jade.escape((jade_interp = claimer.email) == null ? '' : jade_interp)) + "</div></div></div></div>");
};
// iterate postsData
;(function(){
  var $$obj = postsData;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["claimed"](val._id, val.name, val.description, val.initialPrice, val.claimer);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["claimed"](val._id, val.name, val.description, val.initialPrice, val.claimer);
    }

  }
}).call(this);
}.call(this,"postsData" in locals_for_with?locals_for_with.postsData:typeof postsData!=="undefined"?postsData:undefined));;return buf.join("");
}
function claims(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (postsData) {
jade_mixins["claim"] = function(postId, name, description, price, author){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"post panel panel-info\"><div" + (jade.attr("id", postId, true, false)) + " class=\"panel-heading\">" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "<div class=\"pull-right\">$" + (jade.escape((jade_interp = price) == null ? '' : jade_interp)) + "</div></div><div style=\"display: none\" class=\"panel-body\"><div class=\"post-info-container\"><p>" + (jade.escape((jade_interp = description) == null ? '' : jade_interp)) + "</p><div class=\"pull-left text-info\">Sold by: " + (jade.escape((jade_interp = author.email) == null ? '' : jade_interp)) + "</div></div></div></div>");
};
// iterate postsData
;(function(){
  var $$obj = postsData;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["claim"](val._id, val.name, val.description, val.initialPrice, val.author);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["claim"](val._id, val.name, val.description, val.initialPrice, val.author);
    }

  }
}).call(this);
}.call(this,"postsData" in locals_for_with?locals_for_with.postsData:typeof postsData!=="undefined"?postsData:undefined));;return buf.join("");
}
function edit_post(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name, description, price, postId) {
buf.push("<div class=\"container\">     <form id=\"edit-post-form\" role=\"form\" enctype=\"multipart/form-data\"><div class=\"form-group\"><label for=\"name\" class=\"col-md-3 control-label\">Item Name :</label><input id=\"post-name\" type=\"text\" name=\"name\"" + (jade.attr("value", '' + (name) + '', true, false)) + " required=\"required\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"decription\" class=\"col-md-3 control-label\">Description:</label><input id=\"post-description\" type=\"textarea\" name=\"description\"" + (jade.attr("value", '' + (description) + '', true, false)) + " required=\"required\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"price\" class=\"col-md-3 control-label\">Price $</label><input id=\"post-price\" type=\"text\" name=\"initialPrice\"" + (jade.attr("value", '' + (price) + '', true, false)) + " required=\"required\" class=\"form-control\"/><button id=\"edit-post-button\" type=\"submit\"" + (jade.attr("data-postid", '' + (postId) + '', true, false)) + " class=\"btn btn-default\">Save Changes</button></div></form></div>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"price" in locals_for_with?locals_for_with.price:typeof price!=="undefined"?price:undefined,"postId" in locals_for_with?locals_for_with.postId:typeof postId!=="undefined"?postId:undefined));;return buf.join("");
}
function new_post(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\">     <form role=\"form\" enctype=\"multipart/form-data\"><div class=\"form-group\"><label for=\"name\" class=\"col-md-3 control-label\">Item Name :</label><input id=\"item_name\" type=\"text\" name=\"name\" placeholder=\"Enter Item Name\" required=\"required\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"decription\" class=\"col-md-3 control-label\">Description:</label><input id=\"item_description\" type=\"textarea\" name=\"description\" placeholder=\"Enter Item Description\" required=\"required\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"price\" class=\"col-md-3 control-label\">Price $</label><input id=\"item_price\" type=\"text\" name=\"initialPrice\" placeholder=\"Price\" required=\"required\" class=\"form-control\"/><button id=\"item_post_button\" type=\"submit\" class=\"btn btn-default\">Submit</button></div></form></div>");;return buf.join("");
}
function posts(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (postsData, userId) {
jade_mixins["post"] = function(loggedInUserId, author, postId, name, description, price, isAuctioningItem, expirationDate){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div class=\"post panel panel-info\"><div" + (jade.attr("id", postId, true, false)) + " class=\"panel-heading\">" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "<div class=\"pull-right\">$" + (jade.escape((jade_interp = price) == null ? '' : jade_interp)) + "</div></div><div style=\"display: none\" class=\"panel-body\"><div class=\"post-info-container\"><p>" + (jade.escape((jade_interp = description) == null ? '' : jade_interp)) + "</p><div class=\"pull-left text-info\">Sold by: " + (jade.escape((jade_interp = author.email) == null ? '' : jade_interp)) + "</div>");
if ( (loggedInUserId != author._id))
{
buf.push("<div class=\"claim pull-right\"><div" + (jade.attr("data-postid", '' + (postId) + '', true, false)) + " onclick=\"claimItem(this)\" class=\"btn btn-primary\">Claim Item</div></div>");
}
buf.push("</div></div></div>");
};
// iterate postsData
;(function(){
  var $$obj = postsData;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["post"](userId, val.author, val._id, val.name, val.description, val.initialPrice, val.isAuctioningItem, val.expirationDate);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["post"](userId, val.author, val._id, val.name, val.description, val.initialPrice, val.isAuctioningItem, val.expirationDate);
    }

  }
}).call(this);
}.call(this,"postsData" in locals_for_with?locals_for_with.postsData:typeof postsData!=="undefined"?postsData:undefined,"userId" in locals_for_with?locals_for_with.userId:typeof userId!=="undefined"?userId:undefined));;return buf.join("");
}