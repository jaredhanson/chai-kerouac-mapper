var Server = require('./server');


exports = module.exports = function(chai, utils) {
  var Test = require('./test');
  
  chai.kerouac = chai.kerouac || {};
  chai.kerouac.map = function(client, pages) {
    return new Test(client, pages);
  };
  
  
  var Assertion = chai.Assertion;
  
  Assertion.addMethod('request', function(paths) {
    var obj = this._obj;
    
    new Assertion(obj).to.be.an.instanceof(Server);
    
    var assertion = new Assertion(obj.paths);
    utils.transferFlags(this, assertion, false);
    assertion.deep.equal(paths);
  });
  
  Assertion.addMethod('error', function(err) {
    var obj = this._obj;
    
    new Assertion(obj).to.be.an.instanceof(Server);
    
    this.assert(
        obj.errors[0].message == err
      , 'expected client to error with message #{exp} but errored with #{act}'
      , 'expected client to not error with message #{act}'
      , err  // expected
      , obj.errors[0].message  // actual
    );
  });
};
