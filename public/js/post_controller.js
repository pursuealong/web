var home = angular.module("home", []);

home.controller("main", function($scope, $http, $location) {

  var lat = null;
  var lng = null;
  function doGet(query) {
    if (lng == null || lat == null) {
      alert("gps failed!");
      return;
    }
    if (query == "groups") {
      var url = '../' + query + "/" + lat + "/" + lng;
    } else { // post and comment
      var url_tmp = $location.$$absUrl.split("/");
      var pid = url_tmp[url_tmp.length - 1];
      var url = '../' + query + "/" + pid;
    }
    var resp = $http.get(url);
    resp.success(function(data, status, headers, config) {
      if (query == 'comments') $scope.comments = data;
      else if (query == 'groups') $scope.groups = data;
      else $scope.content = data;
    });
    resp.error(function(data, status, headers, config) {
      alert("ajax failed!");
    });
  }
  $scope.postGroup = function() {
    var tag = $scope.groupInput;
    var body = {
      lat: lat,
      lng: lng,
      tag: tag
    };

    var resp = $http.post('../' + "groups", body);
    resp.success(function(data, status, headers, config) {
      if ($scope.groups) {
        $scope.groups.push(data);
      } else {
        $scope.groups = [data];
      }
    });
    resp.error(function(data, status, headers, config) {
      alert("Failure Message: " + data);
    });
  }
  $scope.postComment = function() {
    var tag = $scope.groupInput;
    var body = {
      'content': $scope.content,
      'text': $scope.comment_box
    };

    var resp = $http.post('../' + "comments", body);
    resp.success(function(data, status, headers, config) {
      data.author = "me";
      if ($scope.comments) {
        $scope.comments.push(data);
      } else {
        $scope.comments = [data];
      }
    });
    resp.error(function(data, status, headers, config) {
      alert("Failure Message: " + data);
    });
  }
  $scope.doUpvote = function(comment) {
    var resp = $http({
      method: "POST",
      url: '../' + "upvote",
      data: {comment: comment}
    });
    resp.success(function(data, status, headers, config) {
      // Success! 
      if (data.upvote.length != comment.upvote.length) {
        var i = 0;
        for (i = 0; i < $scope.comments.length; i ++) {
          if ($scope.comments[i]._id == data._id) {
            $scope.comments[i].upvote = data.upvote;
            break;
          }
        }
      } else {
        // alert the user: one has already upvoted.
      }
    });
  }

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  function showPosition(pos) {
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
    doGet("post");
    doGet("groups");
    doGet("comments");
    console.log($scope.comments);
  } 
  $scope.init = function() {
    getLocation();
  };
  
});
