var events = require('events')
  , util = require('util');

function Page(path) {
  events.EventEmitter.call(this);
  this.path = path;
}

util.inherits(Page, events.EventEmitter);

module.exports = Page;
