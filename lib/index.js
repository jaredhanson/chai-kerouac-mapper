var Server = require('./server');


exports = module.exports = function(chai, utils) {
  var Test = require('./test');
  
  chai.kerouac = chai.kerouac || {};
  chai.kerouac.map = function(fn) {
    return new Test(fn);
  };
  
  
  var Assertion = chai.Assertion;
  
  Assertion.addMethod('request', function(paths) {
    var obj = this._obj;
    
    new Assertion(obj).to.be.an.instanceof(Server);
    
    var assertion = new Assertion(obj.paths);
    utils.transferFlags(this, assertion, false);
    assertion.deep.equal(paths);
  });
};
