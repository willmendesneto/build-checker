var BuildChecker = require('./build-checker');
var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {
  buildChecker = new BuildChecker();
  buildChecker.startPolling();
});
