var passport = require('passport')
var jm = require('jm-dao');

module.exports = function (opts) {
  ['db', 'gateway'].forEach(function (key) {
    process.env[key] && (opts[key] = process.env[key])
  })

  var db = opts.db;

  var service = require('./service')(opts)

  var self = this
  this.on('open', function () {
    var middle = self.servers.http.middle
    middle.use(passport.initialize())
    require('./router').call(service, middle)
  })

  let cb = function (db) {
    opts.db = db;
    service.sq = jm.sequence({db: db})
  }

  if (!db) {
    db = jm.db.connect().then(cb)
  } else if (typeof db === 'string') {
    db = jm.db.connect(db).then(cb)
  }

  return service
}
