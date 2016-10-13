var apiKey = require('./../.env').apiKey;

function Weather(){
}

//Kelvin temperature prototype
Weather.prototype.getTempKelvin = function(city) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    $('#displayed-temp-K').text("current temp: " + response.main.temp + " kelvin");

  }).fail(function(error) {
    $('#displayed-temp-K').text(error.responseJSON.message);

  }); // Approach #1 for displaying data from a function
}

//Fahrenheit temperature prototype

Weather.prototype.getTempFahrenheit = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {

    var tempF = ((response.main.temp * 9/5 - 459.67).toFixed(2));
    displayFunction(tempF);


  }).fail(function(error) {
    $('#displayed-temp-F').text(error.responseJSON.message);

  });
}

//Humidity prototype
Weather.prototype.getHumidityPercent = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {

    displayFunction(response.main.humidity);

  }).fail(function(error) {
    $('#displayed-humidity-text').text(error.responseJSON.message);

  }); // Approach #2 (preferred) for displaying data from a function
}

exports.weatherModule = Weather;
