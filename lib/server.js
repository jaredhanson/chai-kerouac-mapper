var events = require('events')
  , Page = require('./page')
  , util = require('util');

function Server() {
  events.EventEmitter.call(this);
  this.paths = [];
  this.pages = {};
}

util.inherits(Server, events.EventEmitter);

Server.prototype.accept = function(client) {
  var self = this;
  
  client.on('request', function(req) {
    self.paths.push(req.path);
    var page = new Page(req.path);
    self.pages[req.path] = page;
    
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
