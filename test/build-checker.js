var BuildChecker = require('../src/build-checker');
var CONFIG = require('../src/configuration');
var five = require('johnny-five');
var request = require('request');
var sinon = require('sinon');
var fs = require('fs');
var successResponseCI = fs.readFileSync(__dirname + '/fixtures/success.xml', 'utf8');
var errorResponseCI = fs.readFileSync(__dirname + '/fixtures/error.xml', 'utf8');
var clock = null;

describe('BuildChecker', function() {
  beforeEach(function() {
    buildChecker = new BuildChecker();
  });

  it('should have the led success port configured', function() {
    (buildChecker.ledSuccess instanceof five.Led).should.be.equal(true);
  });

  it('should have the led error port configured', function() {
    (buildChecker.ledError instanceof five.Led).should.be.equal(true);
  });

  describe('#stopPolling', function() {
    beforeEach(function() {
      sinon.spy(global, 'clearInterval');
      buildChecker.stopPolling();
    });

    it('should remove interval', function() {
      global.clearInterval.calledOnce.should.be.true;
    });
  });

  describe('#startPolling', function() {
    beforeEach(function() {
      sinon.spy(global, 'setInterval');
      buildChecker.startPolling();
    });

    afterEach(function() {
      global.setInterval.restore();
      buildChecker.stopPolling();
    });

    it('should creates polling', function() {
      global.setInterval.calledOnce.should.be.true;
    });

    describe('When the CI server send success response', function() {
      beforeEach(function() {
        clock = sinon.useFakeTimers();
        sinon.stub(request, 'get').yields(null, null, successResponseCI);
        sinon.spy(buildChecker.ledSuccess, 'on');
        sinon.spy(buildChecker.ledError, 'off');
        buildChecker.startPolling();
        clock.tick(CONFIG.INTERVAL);
      });

      afterEach(function() {
        request.get.restore();
        clock.restore();
        buildChecker.stopPolling();
      });

      it('should turn on the success led', function() {
        buildChecker.ledSuccess.on.calledOnce.should.be.true;
      });

      it('should turn off the error led', function() {
        buildChecker.ledError.off.calledOnce.should.be.true;
      });
    });

    describe('When the CI server send error response', function() {
      beforeEach(function() {
        clock = sinon.useFakeTimers();
        sinon.stub(request, 'get').yields(null, null, errorResponseCI);
        sinon.spy(buildChecker.ledError, 'on');
        sinon.spy(buildChecker.ledSuccess, 'off');
        buildChecker.startPolling();
        clock.tick(CONFIG.INTERVAL);
      });

      afterEach(function() {
        request.get.restore();
        clock.restore();
        buildChecker.stopPolling();
      });

      it('should turn off the success led', function() {
        buildChecker.ledSuccess.off.calledOnce.should.be.true;
      });

      it('should turn on the error led', function() {
        buildChecker.ledError.on.calledOnce.should.be.true;
      });
    });
  });
});
