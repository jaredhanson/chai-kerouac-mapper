var Server = require('./server')
  , Client = require('./client');

/**
 * Creates an instance of `Test`.
 *
 * @constructor
 * @api protected
 */
function Test(client) {
  client.request = Client.request;
  
  this._client = client;
}

/**
 * Register a callback to be invoked when mapper finishes.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.finish = function(cb) {
  this._finish = cb;
  return this;
};

Test.prototype.generate = function() {
  var self = this
    , client = this._client
    , server = new Server();
  
  client.on('request', function(req) {
  });
  
  client.on('finish', function() {
    self._finish.call(this);
  });
  
  client.map(server);
  if (client.wait) {
    server.emit('finish');
  }
}

module.exports = Test;
