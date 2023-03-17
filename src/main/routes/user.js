//Define as rotas
let app = require('express').Router()

const UserController = require('../controllers/user')

const isAuthenticated = require('../middlewares/isAuthenticated')

app.post('/register', (req, res) => UserController.create(req, res))
app.post('/login', (req, res) => UserController.login(req, res))
app.get('/userData', isAuthenticated, (req, res) =>
  UserController.userData(req, res)
)

module.exports = app
