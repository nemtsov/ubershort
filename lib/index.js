var codec = require('./codec'),
  crypto = require('crypto'),
  db = {
    urls: [],
    counter: -1,
    index: {}
  };

exports.save = function (url, cb) {
  var hash = hashUrl(url),
    id = db.index[hash];
  if (!id) {
    id = codec.encode(++db.counter);
    db.index[hash] = id;
    db.urls[db.counter] = url;
  }
  next(id, cb);
};

exports.get = function (id, cb) {
  var id = codec.decode(id)
  next(db.urls[id], cb);
};

function next(txt, cb) {
  process.nextTick(function () {
    cb(null, txt);
  });
}

function hashUrl(url) {
  var hash = crypto.createHash('md5');
  hash.update(url);
  return hash.digest('hex');
}
