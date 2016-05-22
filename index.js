var request = require('request');
var five = require('johnny-five');
var board = new five.Board();

var CONFIG = {
  LED: {
    SUCCESS: 12,
    ERROR: 10
  },
  CI_CCTRACKER_URL: 'https://snap-ci.com/willmendesneto/generator-reactor/branch/master/cctray.xml',
  INTERVAL: 1000
};

board.on('ready', function() {

  var ledSuccess = new five.Led(CONFIG.LED.SUCCESS);
  var ledError = new five.Led(CONFIG.LED.ERROR);
  var ciTrackerURL = CONFIG.CI_CCTRACKER_URL;
  var counter = 0;
  setInterval(function(){

    request(CONFIG.CI_CCTRACKER_URL, function(error, response, body) {
      if (error) {
        console.log('Somethink is wrong with your CI =(');
        return;
      }

      if(body.indexOf('Success') !== -1) {
        console.log('Your CI is ok!');

        ledSuccess.on();
        ledError.off();

      } else {
        console.log('Somethink is wrong with your CI =(. Fix it!!!!');

        ledSuccess.off();
        ledError.on();
      }

    });
  }, CONFIG.INTERVAL);

});
