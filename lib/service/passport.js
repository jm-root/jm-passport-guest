var passport = require('passport')
var Strategy = require('passport-local').Strategy
var error = require('jm-err')
var Err = error.Err

module.exports = function (service, opts) {
  passport
    .use(new Strategy(
      function (username, password, cb) {
        service.user.post('/signon', {username: username, password: password})
          .then(function (doc) {
            if (!doc.err) return service.sso.post('/signon', doc)
            return doc
          })
          .then(function (doc) {
            cb(null, doc)
          })
          .catch(cb)
      }))
  return passport
}
