var events = require('events')
  , Page = require('./page')
  , util = require('util');

function Server() {
  events.EventEmitter.call(this);
  this.pages = {};
  this.paths = [];
  this.errors = [];
}

util.inherits(Server, events.EventEmitter);

Server.prototype.accept = function(client) {
  var self = this;
  
  client.on('request', function(req) {
    self.paths.push(req.path);
    var page = new Page(req.path);
    self.pages[req.path] = page;
    
    req.emit('response', page);
  });
  
  client.on('finish', function() {
    self.emit('close');
  });
  
  client.on('error', function(err) {
    self.errors.push(err);
    self.emit('clientError', err);
  });
  
  client.map(this);
  
  process.nextTick(function() {
    if (client.wait) {
      self.emit('finish');
    }
  });
};

Server.prototype.handle = function(page) {
  this.emit('request', page);
};

module.exports = Server;
