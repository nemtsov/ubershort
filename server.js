var http = require('http'),
  parseUrl = require('url').parse,
  ubershort = require('./lib'),
  server;

server = http.createServer(function (req, res) {
  req.url = parseUrl(req.url, true);
  if ('POST' === req.method) save(req, res);
  else redirect(req, res);
});

function save(req, res) {
  var url = req.url.query.url;
  if (!url) return badInput(res);
  ubershort.save(url, function (err, id) {
    if (err) return error(err, res);
    res.writeHead(200);
    res.end(id);
  });
}

function redirect(req, res) {
  var id = req.url.path.replace(/^\//, '');
  if (!id) return badInput(res);
  ubershort.get(id, function (err, url) {
    if (err) return error(err, res);
    if (url) res.writeHead(302, {location: url});
    else res.writeHead(404);
    res.end();
  });
}

function badInput(res) {
  res.writeHead(400);
  res.end();
}

function error(err, res) {
  res.writeHead(500);
  res.end(err.stack);
}

server.listen(process.env.PORT || 3000);
