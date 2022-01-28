// Imports
const jwt = require('jsonwebtoken')

const config = require('../../config/index')

// Auth Middleware
const authMiddleware = function (request, response, next) {
  const token =
    request.body.token ||
    request.query.token ||
    request.headers['x-access-token'] ||
    request.cookies.token

  if (token && token !== 'null') {
    request.user = jwt.verify(token, config.secret)
  } else {
    request.user = {}
  }

  next()
}

// Export
module.exports = authMiddleware
