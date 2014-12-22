var x = document.getElementById("gps_loc");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        navigator.geolocation.getCurrentPosition(storePosition);
    }
}
function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
x.innerHTML = "Your Location is<br>";
x.innerHTML += "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}

function storePosition(pos) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    // put latlon into a server 
}

window.onload = function() {
  getLocation();
};
