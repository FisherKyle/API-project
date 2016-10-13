var apiKey = "e3d4cbe8659a1b94a731db31bd8f0d46";

$(document).ready(function(){
  $('#weatherLocation').submit(function(event) {
    event.preventDefault();
    var city = $('#location').val();
    $('#location').val("");
    $('#displayed-city').text("current city: " + city);
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey, function(response) {
      console.log(response);
    });
  });
});
