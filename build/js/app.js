(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "e3d4cbe8659a1b94a731db31bd8f0d46";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}]},{},[2]);
