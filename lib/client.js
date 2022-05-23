var Request = require('./request');

exports.request = function request(path, callback) {
  var req = new Request(path);
  if (callback) { req.once('response', callback); }
  this.emit('request', req);
  return req;
};
