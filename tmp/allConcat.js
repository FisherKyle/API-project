
var Weather = require('./../js/weather.js').weatherModule;

var displayHumidity = function(humidityData) {
  $('#displayed-humidity-text').text("current humidity: " + humidityData + "%"); // Approach #2 (preferred) for displaying data from a function
}
$(document).ready(function(){
  //
  var currentWeatherObject = new Weather();

  $('#weatherLocation').submit(function(event) {
    event.preventDefault();
    var city = $('#location').val();

    $('#displayed-city').text("current city: " + city);
    $('#showWeatherOptions').show();
  }); //end submit

//  ============================= temp ============================= //
  $('#display-temp').click(function(){
    var city = $('#location').val();
    currentWeatherObject.getTempKelvin(city); // Approach #1 for displaying data from a function

  });

//  ========================== humidity =========================== //

  $('#display-humidity').click(function(){
    var city = $('#location').val();
    currentWeatherObject.getHumidityPercent(city, displayHumidity); // Approach #2 (preferred) for displaying data from a function
  });

}); //end ready
