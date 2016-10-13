var apiKey = "e3d4cbe8659a1b94a731db31bd8f0d46";

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

      console.log("current temp: " + response.main.temp + " kelvin");

    });
  });

  $('#display-humidity').click(function() {
    var city = $('#location').val();
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {

      console.log("current humidity: " + response.main.humidity + "%");

    });
  });

}); //end ready
