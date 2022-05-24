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
 * Register a callback to be invoked when the server closes.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.close = function(cb) {
  this._close = cb;
  return this;
};

Test.prototype.generate = function() {
  var self = this
    , client = this._client
    , server = new Server();
  
  server.on('close', function() {
    self._close.call(server);
  });
  
  server.accept(client);
}

module.exports = Test;
