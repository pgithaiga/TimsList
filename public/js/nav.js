
// Set up click listeners
var setup = function() {
	$('#all-active').off();
	$('#my-active').off();
	$('#my-claimed').off();
	$('#my-claims').off();
	$(".edit_post_button").off();
	$(".menu-delete-post").off();
	$(".item_post_button").off();
	$("#new_post").off();

	$('#all-active').click(function() {
  	loadAllActivePosts();
  });

  $('#my-active').click(function() {
  	loadMyActivePosts();
  });

	$("#new_post").click(function(){
	  newPost();
	});

	$("#item_post_button").click(function(){
	  makePost();
	});

	$('#edit-post-button').click(function() {
		editPost($(this).attr('data-postid'));
	})

  $('#my-claimed').click(function() {
  	loadMyClaimedPosts();
  });

  $('#my-claims').click(function() {
  	loadMyClaims();
  });

  loadEditPost();

  deletePost();

	showInfoListener();
};

// Load all the active posts
var loadAllActivePosts = function() {
	clearNavSelectClass();
	$('#main-heading').text('Posts');
	$('#all-active').addClass('active');
	var loggedInUserId = $('#userId').text();
	$.get('/posts/available', function (data) {
		var postsData = data.content;
		var postsHtml = posts({
				userId: loggedInUserId,
				postsData: postsData,
		});
		$('#main-body').html(postsHtml)
									  .promise()
										.done(function () {
											setup();
										});

	});
};

// Load the current user's active posts
var loadMyActivePosts = function() {
	clearNavSelectClass();
	$('#my-active').addClass('active');
	var loggedInUserId = $('#userId').text();
	$.get('users/' + loggedInUserId + '/posts/available', function (data) {
		var postsData = data.content;
		var postsHtml = active_posts({
				userId: loggedInUserId,
				postsData: postsData,
		});
		$('#main-body').html(postsHtml)
									  .promise()
										.done(function () {
											setup();

										});

	});
};

// Load the current user's claimed posts
var loadMyClaimedPosts = function() {
	clearNavSelectClass();
	$('#my-claimed').addClass('active');
	var loggedInUserId = $('#userId').text();
	$.get('users/' + loggedInUserId + '/posts/claimed', function (data) {
		var postsData = data.content;
		var postsHtml = claimed({
				userId: loggedInUserId,
				postsData: postsData,
		});
		$('#main-body').html(postsHtml)
									  .promise()
										.done(function () {
											setup();
										});

	});
};

// Load the current user's claims
var loadMyClaims = function() {
	clearNavSelectClass();
	$('#my-claims').addClass('active');
	var loggedInUserId = $('#userId').text();
	$.get('users/' + loggedInUserId + '/posts/claims', function (data) {
		var postsData = data.content;
		var postsHtml = claims({
				userId: loggedInUserId,
				postsData: postsData,
		});
		$('#main-body').html(postsHtml)
									  .promise()
										.done(function () {
											setup();

										});

	});
};

// Claim an item
var claimItem = function(obj) {
	var loggedInUserId = $('#userId').text();
	var postId = $(obj).attr('data-postid');
	console.log(postId);
	$.ajax({
        type: "POST",
        url: "/users/" + loggedInUserId + "/posts/" + postId + '/claim', 
        success: function(msg){
            loadMyClaims();  
        },
        error: function(){
            alert('the item has already been claimed. Please refresh browser to get updated posts');
        }
    });
};

var bidItem = function(obj) {
	var loggedInUserId = $('#userId').text();

	var name = $obj.attr('data-name');
	var description = $obj.attr('data-description');
	var price = $obj.attr('data-price');
	var postId = $obj.attr('data-postid');
	console.log(postId);
	$.ajax({
        type: "POST",
        url: "/posts/" + postId + '/bid', 
        data : {curr_user : loggedInUserId,
        	postId : postId,
        	requestedPrice : price},

        success: function(msg){
            loadMyClaims();  
        },
        error: function(){
            alert('the item has already been claimed. Please refresh browser to get updated posts');
        }
    });
};

// Load the edit post form 
var loadEditPost = function() {
	$('.menu-edit-post').click(function() {
		var $obj = $(this);
		var name = $obj.attr('data-name');
		var description = $obj.attr('data-description');
		var price = $obj.attr('data-price');
		var postId = $obj.attr('data-postid');
		console.log(postId);

		var postsHtml = edit_post({
					name: name,
					description: description,
					price: price,
					postId: postId
		});
		$('#main-body').html(postsHtml)
									  .promise()
										.done(function () {
											setup();
										});
	});
};

// Load the make post form
var makePost = function(){
  var userId = $('#userId').text();
  var name = $("#item_name").val();
  var description = $("#item_description").val();
  var initialPrice = $("#item_price").val();
  console.log('hters');

  $.ajax({
    type : "POST",
    url : '/users/'+ userId + '/posts',
    data : {name : name, description : description, initialPrice : initialPrice},
    success: function(response){
      loadAllActivePosts(); 
    },error : function(){
      alert("failed to create Post");
    }
  });
};

// Edit a post
var editPost = function(postId){
	console.log('here');
  var userId = $('#userId').text();
  var name = $("#post-name").val();
  var description = $("#post-description").val();
  var initialPrice = $("#post-price").val();

  console.log('calling edit post');

  $.ajax({
      type: "PUT",
      url: '/users/'+ userId + '/posts/' + postId,
      data : {name : name, description : description, initialPrice : initialPrice},
      success: function(msg){
          loadMyActivePosts();
      },
      error: function(){
          alert("failed to edit post. Try again");
      }
  });
};

// Delete a post
var deletePost = function() {
	$(".menu-delete-post").click(function(){
		var postId = $(this).attr('data-postid');
		var loggedInUserId = $('#userId').text();
    $.ajax({
        type: "DELETE",
        url: "/users/" + loggedInUserId + "/posts/" + postId, 
        success: function(msg){
            loadMyActivePosts();  
        },
        error: function(){
            alert("failed to delete post. Try again!");
        }
    });
  });
};

// Listener that shows item info when the info header is clicked
var showInfoListener = function() {
	$('.panel-heading').click(function() {
                          var changeTime = 500;
                          var postInfo = $($(this).parent().children('.panel-body').get(0));
                          if (postInfo.css('display') === 'none') {
                            postInfo.show(changeTime);
                          } else {
                            postInfo.hide(changeTime);
                          }
                      });
};

// Generate form to create a new post
var newPost = function(){ 
    var postsHtml = new_post();
    $('#main-body').html(postsHtml)
                    .promise()
                    .done(function () {                     
                      setup();
                    });


}

// Clear the selected menu item
var clearNavSelectClass = function() {
	$('#nav a').removeClass('active');
};