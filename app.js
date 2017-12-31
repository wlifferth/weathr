units = 'f';
currentTemp = 0;

function fToC(t) {
  return (t - 32) * 5 / 9;
}

function cToF(t) {
  return (t * 9 / 5) + 32;
}

function getLocation() {
  console.log("getLocation");
  $("#refresh").html("Refreshing...");
  navigator.geolocation.getCurrentPosition(getWeather);
}

function getWeather(locationResult) {
  var lat = Math.round(locationResult['coords']['latitude']);
  var lon = Math.round(locationResult['coords']['longitude']);
  var apiCall = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`
  console.log(apiCall);
  $.getJSON({'url': apiCall}, updateData);
}

function updateData(weatherResult) {
  console.log(weatherResult);
  var newTemp = weatherResult['main']['temp'];
  if(units == 'f') newTemp = cToF(newTemp);
  currentTemp = newTemp;
  updateTemp();
  var newHumidity = weatherResult['main']['humidity'];
  $("#humidity").html(`<div class="number text-center" id="humidity">${newHumidity}</div>`);
  updateBackground();
  $("#refresh").html("Refresh");
}

function updateTemp() {
  $("#temperature").html(`<div class="number text-center" id="temperature">${Math.round(currentTemp)}&deg;<sup>${units.toUpperCase()}</sup></div>`);
}

function toggleUnits() {
  if(units == 'f') {
    units = 'c';
    currentTemp = fToC(currentTemp);
    $("#units").text("Fahrenheit");
  } else {
    units = 'f';
    currentTemp = cToF(currentTemp);
    $("#units").text("Celsius");
  }
  updateTemp();
}

function updateBackground() {
  var currentFTemp = units == 'f' ? currentTemp : cToF(currentTemp);
  if(currentFTemp < 32) {
    $("body").css('background-image', 'url(' + 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?auto=format&fit=crop&w=1050&q=80' + ')');
    $("body").css('background-size', '100% auto');
  } else if (currentFTemp < 60) {
    $("body").css('background-image', 'url(' + 'https://images.unsplash.com/photo-1422065254131-0959ca26ded4?auto=format&fit=crop&w=1050&q=80' + ')');
    $("body").css('background-size', '100% auto');
  } else if (currentFTemp < 80) {
    $("body").css('background-image', 'url(' + 'https://images.unsplash.com/photo-1422224832140-0e546210efc3?auto=format&fit=crop&w=1050&q=80' + ')');
    $("body").css('background-size', '100% auto');
  } else {
    $("body").css('background-image', 'url(' + 'https://unsplash.com/photos/WUo0EdSv9OU' + ')');
    $("body").css('background-size', '100% auto');
  }
  console.log("updated background");
}

console.log("YO!");
$(document).ready(() => {
  $("#refresh").click(getLocation);
  $("#units").click(toggleUnits);
  getLocation();
})
