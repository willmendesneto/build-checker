require('should');
var mockFirmata = require('mock-firmata');
var five = require('johnny-five');

var Board = five.Board;
var Accelerometer = five.Accelerometer;
var board = new Board({
  io: new mockFirmata.Firmata(),
  debug: false,
  repl: false
});
