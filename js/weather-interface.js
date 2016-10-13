var apiKey = require('./../.env').apiKey;

$(document).ready(function(){
  $('#weatherLocation').submit(function(event) {
    event.preventDefault();
    var city = $('#location').val();

    $('#displayed-city').text("current city: " + city);
    $('#showWeatherOptions').show();
  }); //end submit

  $('#display-temp').click(function() {
    var city = $('#location').val();
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {

      $('#displayed-temp-text').text("current temp: " + response.main.temp + " kelvin");
    }).fail(function(error) {
      $('#displayed-temp-text').text(error.responseJSON.message);

    });
  });

  $('#display-humidity').click(function() {
    var city = $('#location').val();
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {

      $('#displayed-humidity-text').text("current humidity: " + response.main.humidity + "%");
    }).fail(function(error) {
      $('#displayed-humidity-text').text(error.responseJSON.message);

    });
  });

}); //end ready
