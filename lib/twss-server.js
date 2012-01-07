var path = require('path'),
    twss = require('twss'),
    union = require('union'),
    director = require('director');

exports.createServer = function () {
  var router = new director.http.Router();

  router.get('/api/twss', function () {
    this.res.json(200, { twss: twss.is(this.req.query.q) });
  });

  var server = union.createServer({
    before: [
      function (req, res) {
        if (!router.dispatch(req, res)) {
          return res.emit('next');
        }
      }
    ]
  });

  return server;
};

