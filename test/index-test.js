var ubershort = require('../lib'),
  assert = require('assert');

function test(text, cb) {
  ubershort.save(text, function (err, id) {
    if (err) throw err;
    ubershort.get(id, function (err, result) {
      if (err) throw err;
      assert(text, result);
      cb(null);
    });
  });
}

test('hello', function () {
  test('world', function () {
    console.log('ok');
  });
});
