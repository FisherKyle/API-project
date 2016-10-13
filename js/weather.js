var apiKey = require('./../.env').apiKey;

function Weather(){
}

//temperature prototype
Weather.prototype.getTempKelvin = function(city) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    $('#displayed-temp-text').text("current temp: " + response.main.temp + " kelvin");

  }).fail(function(error) {
    $('#displayed-temp-text').text(error.responseJSON.message);

  }); // Approach #1 for displaying data from a function
}

//humidity prototype
Weather.prototype.getHumidityPercent = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {

    displayFunction(response.main.humidity);

  }).fail(function(error) {
    $('#displayed-humidity-text').text(error.responseJSON.message);

  }); // Approach #2 (preferred) for displaying data from a function
}


exports.weatherModule = Weather;
