var Server = require('./server')
  , Client = require('./client');

/**
 * Creates an instance of `Test`.
 *
 * @constructor
 * @api protected
 */
function Test(client, pages) {
  this._client = client;
  this._pages = pages || [];
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
    , server = new Server()
    , client = this._client
    , pages = this._pages
    , i, len;
  
  client.request = Client.request;
  
  server.on('close', function() {
    self._close.call(server);
  });
  
  server.accept(client);
  for (i = 0, len = pages.length; i < len; ++i) {
    server.handle(pages[i]);
  }
}

module.exports = Test;
