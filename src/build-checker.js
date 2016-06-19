var CONFIG = require('./configuration');
var request = require('request');
var five = require('johnny-five');

var SUCCESS_URL = 'https://snap-ci.com/willmendesneto/generator-reactor/branch/master/cctray.xml';
var ERROR_URL = 'https://snap-ci.com/willmendesneto/keepr/branch/master/cctray.xml';
var ciTrackerURL = CONFIG.CI_CCTRACKER_URL;
var counter = 0;

intervalId = null;
function BuildChecker() {
  this.ledSuccess = new five.Led(CONFIG.LED.SUCCESS);
  this.ledError = new five.Led(CONFIG.LED.ERROR);
};

BuildChecker.prototype.stopPolling = function() {
  clearInterval(intervalId);
};

BuildChecker.prototype.startPolling = function() {
  var self = this;

  intervalId = setInterval(function(){

    if (counter === 3) {
      counter = 0;
      if (CONFIG.CI_CCTRACKER_URL === SUCCESS_URL) {
        CONFIG.CI_CCTRACKER_URL = ERROR_URL;
      } else {
        CONFIG.CI_CCTRACKER_URL = SUCCESS_URL;
      }
    } else {
      counter += 1;
    }

    request.get(CONFIG.CI_CCTRACKER_URL, function(error, response, body) {
      if (error) {
        console.log('Somethink is wrong with your CI =(');
        return;
      }

      if(body.indexOf('Success') !== -1) {
        console.log('Your CI is ok!');
        self.ledSuccess.on();
        self.ledError.off();

      } else {
        console.log('Somethink is wrong with your CI =(. Fix it!!!!');

        self.ledSuccess.off();
        self.ledError.on();
      }

    });
  }, CONFIG.INTERVAL);
};


module.exports = BuildChecker;
