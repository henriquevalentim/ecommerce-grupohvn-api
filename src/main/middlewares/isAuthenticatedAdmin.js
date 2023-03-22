const jwt = require('jsonwebtoken')

module.exports = function isAuthenticatedAdmin(req, res, next) {
  const bearerToken = req.headers?.authorization
  if (bearerToken) {
    const token = bearerToken.split(' ')[1]
    const decodeToken = jwt.decode(token)
    if (!decodeToken?.permission?.includes('ADMIN')) {
      return res.status(401).json({ message: 'Usuario não autorizado' })
    }
    req.email = decodeToken.email
    req.id = decodeToken.id
    next()
  } else {
    return res.status(401).json({ message: 'Usuario não autorizado' })
  }
}
