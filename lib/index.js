var Client = require('./client');


exports = module.exports = function(chai, utils) {
  var Test = require('./test');
  
  chai.kerouac = chai.kerouac || {};
  chai.kerouac.map = function(fn) {
    return new Test(fn);
  };
  
  
  var Assertion = chai.Assertion;
  
  Assertion.addMethod('request', function(paths) {
    var obj = this._obj;
    
    new Assertion(obj.map).to.be.a('function');
    new Assertion(obj).to.have.property('_paths');
    
    var assertion = new Assertion(obj._paths);
    utils.transferFlags(this, assertion, false);
    assertion.deep.equal(paths);
  });
};
