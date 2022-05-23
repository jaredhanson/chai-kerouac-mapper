var events = require('events')
  , util = require('util');

function Server() {
}

util.inherits(Server, events.EventEmitter);

module.exports = Server;
