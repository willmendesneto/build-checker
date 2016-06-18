var CONFIG = require('../src/configuration');

describe('Configuration', function() {

  describe('leds information', function() {
    it('should have the success port configured', function(){
      CONFIG.LED.should.have.property('SUCCESS').which.is.a.Number()
    });

    it('should have the error port configured', function(){
      CONFIG.LED.should.have.property('ERROR').which.is.a.Number()
    });
  });

  it('should have the cctray url added', function(){
    CONFIG.should.have.property('CI_CCTRACKER_URL').which.is.a.String()
    CONFIG.CI_CCTRACKER_URL.should.be
  });

  it('should have the interval polling information', function(){
    CONFIG.should.have.property('INTERVAL').which.is.a.Number()
  });

});
