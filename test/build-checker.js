var BuildChecker = require('../src/build-checker');
var five = require('johnny-five');
var sinon = require('sinon');

describe('BuildChecker', function() {

  describe('when `buildChecker` is initialised', function() {

    beforeEach(function(){
      buildChecker = new BuildChecker();
    });

    it('should have the led success port configured', function(){
      (buildChecker.ledSuccess instanceof five.Led).should.be.equal(true);
    });

    it('should have the led error port configured', function(){
      (buildChecker.ledError instanceof five.Led).should.be.equal(true);
    });
  });

  describe('#stopPolling', function(){
    beforeEach(function(){
      sinon.spy(global, 'clearInterval');
      buildChecker.stopPolling();
    });

    it('should remove interval', function(){
      global.clearInterval.calledOnce.should.be.true;
    });
  })
});
