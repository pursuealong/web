var home = angular.module("home", []);

home.controller("main", function($scope, $http) {
  var lat = null;
  var lng = null;
  function doGet(query) {
    if (lng == null || lat == null) {
      alert("GPS Failed!");
      return;
    }
    var resp = $http.get(query + "/" + lat + "/" + lng);
    resp.success(function(data, status, headers, config) {
      $scope[query] = data;
    });
    resp.error(function(data, status, headers, config) {
      alert("AJAX failed!");
    });
  }
  $scope.doPost = function() {
    var content = $scope.postVal;
    var body = {
      content: content,
      lat: lat,
      lng: lng
    };
    if ($scope.content) {
      $scope.content = content + "<br>" + $scope.content;
    } else {
      $scope.content = content;
    }
    var resp = $http.post("/posts", body);
    resp.success(function(data, status, headers, config) {
      $scope.message = data;
      console.log(data);
    });
    resp.error(function(data, status, headers, config) {
      alert("Failure Message: " + data);
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

