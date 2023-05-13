//Define as rotas
let app = require('express').Router()

const UserController = require('../controllers/user')

const isAuthenticated = require('../middlewares/isAuthenticated')
const isAuthenticatedAdmin = require('../middlewares/isAuthenticatedAdmin')

app.post('/register', (req, res) => UserController.create(req, res))
app.post('/login', (req, res) => UserController.login(req, res))
app.post('/loginSocial', (req, res) => UserController.loginSocial(req, res))
app.get('/userData', isAuthenticated, (req, res) =>
  UserController.userData(req, res)
)
app.put('/userData', isAuthenticated, (req, res) =>
  UserController.editUserData(req, res)
)

app.get('/', isAuthenticatedAdmin, (req, res) =>
  UserController.getAllUsers(req, res)
)
app.delete('/:userId', isAuthenticatedAdmin, (req, res) =>
  UserController.deleteUser(req, res)
)
app.get('/:userId', isAuthenticatedAdmin, (req, res) =>
  UserController.getUserById(req, res)
)
app.post('/setAdminInUser/:userId', isAuthenticatedAdmin, (req, res) =>
  UserController.setAdminInUser(req, res)
)

module.exports = app
