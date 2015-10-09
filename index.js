var request = require('request');
var five = require('johnny-five');
var board = new five.Board();


var CONFIG = {
  LED: {
    SUCCESS: 12,
    ERROR: 10
  },
  CI_CCTRACKER_URL: 'https://snap-ci.com/willmendesneto/generator-reactor/branch/master/cctray.xml',
  INTERVAL: 500
};

board.on('ready', function() {

  var ledSuccess = new five.Led(CONFIG.LED.SUCCESS);
  var ledError = new five.Led(CONFIG.LED.ERROR);

  setInterval(function(){
    request(CONFIG.CI_CCTRACKER_URL, function(error, response, body) {
      if (error) {
        console.log('Shit happens =(');
        return;
      }

      if(body.indexOf('Success') !== -1) {
        console.log('Your CI is ok!');

        ledSuccess.on();
        ledError.off();

      } else {
        console.log('Shit happens =(. Your CI is broken! Fix it!!!!');

        ledSuccess.off();
        ledError.on();
      }

    });
  }, CONFIG.INTERVAL);

});
