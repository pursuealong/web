var home = angular.module("home", []);

home.controller("main", function($scope, $http) {
  var lat = null;
  var lng = null;
  function doGet(query) {
    if (lng == null || lat == null) {
      alert("GPS Failed!");
      return;
    }
    console.log(lat + " , " + lng);
    var resp = $http.get(query + "/" + lat + "/" + lng);
    resp.success(function(data, status, headers, config) {
      if (query == 'groups') $scope.groups = data;
      else $scope.content = data;
    });
    resp.error(function(data, status, headers, config) {
      alert("AJAX failed!");
    });
  }
  $scope.postContent = function() {
    var content = $scope.postVal;
    $scope.postVal = "";
    var body = {
      content: content,
      lat: lat,
      lng: lng
    };
    var resp = $http.post("/posts", body);
    resp.success(function(data, status, headers, config) {
      data.author = "me";
      if ($scope.content) {
        $scope.content.push(data);
      } else {
        $scope.content = [data];
      }
    });
    resp.error(function(data, status, headers, config) {
      alert("Failure Message: " + data);
    });
  }
  $scope.postGroup = function() {
    var tag = $scope.groupInput;
    var body = {
      lat: lat,
      lng: lng,
      tag: tag
    };

    var resp = $http.post("groups", body);
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

  $scope.doUpvote = function(content) {
    var resp = $http({
      method: "POST",
      url: "/upvote",
      data: {content: content}
    });
    resp.success(function(data, status, headers, config) {
      // Success! 
      if (data.upvote.length != content.upvote.length) {
        var i = 0;
        for (i = 0; i < $scope.content.length; i ++) {
          if ($scope.content[i]._id == data._id) {
            $scope.content[i].upvote = data.upvote;
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
    doGet("posts");
    doGet("groups");
  } 
  $scope.init = function() {
    getLocation();
  };
  
});

