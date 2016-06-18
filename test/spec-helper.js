;require('should');
var mocks = require('./mocks/index.js');
var Firmata = require('./mocks/mock-firmata');
var Pins = require('./mocks/mock-pins');
var five = require('johnny-five');
var SerialPort = require('./mocks/mock-serialport');

if (mocks.Firmata !== Firmata) {
  console.log(mocks.Firmata, Firmata);
  console.log('MockFirmata not exported correctly');
  process.exit(1);
}

if (mocks.Pins !== Pins) {
  console.log('MockPins not exported correctly');
  process.exit(1);
}

if (mocks.SerialPort !== SerialPort) {
  console.log('MockSerial not exported correctly');
  process.exit(1);
}

var Board = five.Board;
var Accelerometer = five.Accelerometer;
var board = new Board({
  io: new mocks.Firmata(),
  debug: false,
  repl: false
});
