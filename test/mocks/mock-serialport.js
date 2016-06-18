// Derived and adapted from firmata/test/MockSerialPort.js

var util = require('util');
var events = require('events');

var MockSerialPort = function(path) {
  this.path = path;
  this.isClosed = false;
};

util.inherits(MockSerialPort, events.EventEmitter);

MockSerialPort.prototype.write = function() {};

MockSerialPort.prototype.close = function() {
  this.isClosed = true;
};

MockSerialPort.list = function(callback) {};


module.exports = MockSerialPort;
