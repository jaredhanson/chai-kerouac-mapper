var Request = require('./request');

exports.request = function request(path, callback) {
  this._paths = this._paths || [];
  this._paths.push(path);
  
  var req = new Request(path);
  if (callback) { req.once('response', callback); }
  this.emit('request', req);
  return req;
};
