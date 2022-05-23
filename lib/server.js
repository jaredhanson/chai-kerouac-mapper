var events = require('events')
  , util = require('util');

function Server() {
  events.EventEmitter.call(this);
}

util.inherits(Server, events.EventEmitter);

Server.prototype.accept = function(client) {
  client.map(this);
  if (client.wait) {
    this.emit('finish');
  }
};

module.exports = Server;
