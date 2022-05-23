var events = require('events')
  , Page = require('./page')
  , util = require('util');

function Server() {
  events.EventEmitter.call(this);
}

util.inherits(Server, events.EventEmitter);

Server.prototype.accept = function(client) {
  client.on('request', function(req) {
    var page = new Page(req.path);
    
    process.nextTick(function() {
      req.emit('response', page);
    });
  });
  
  client.map(this);
  if (client.wait) {
    this.emit('finish');
  }
};

module.exports = Server;
