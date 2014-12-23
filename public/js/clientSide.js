var x = document.getElementById("gps_loc");
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      navigator.geolocation.getCurrentPosition(storePosition);
  }
}
function showPosition(pos) {
  var lat = pos.coords.latitude;
  var lng = pos.coords.longitude;
  var latlon = lat + "," + lng; 
  $.ajax({
    type: 'GET',
    dataType: 'JSON',
    url: './geo/' + lat + '/' + lng
  }).done(function(data) {
    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
    x.innerHTML = "Your Location is<br>";
    x.innerHTML += "Latitude: " + lat + "<br>Longitude: " + lng + "<br>";
    x.innerHTML += data.results[0].formatted_address + "<br>";
  });
}

function storePosition(pos) {
  var lat = pos.coords.latitude;
  var lng = pos.coords.longitude;
  var latlon = lat + "," + lng;
    // put latlon into a server 
}

window.onload = function() {
  getLocation();
};
