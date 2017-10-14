var MS = require('jm-ms')
let ms = MS()

module.exports = function (opts) {
  var o = {}
  var bind = function (name, uri) {
    uri || (uri = '/' + name)
    ms.client({
      uri: opts.gateway + uri
    }, function (err, doc) {
      !err && doc && (o[name] = doc)
    })
  }

  bind('sso')
  bind('user')
  o.passport = require('./passport')(o)
  return o
}
