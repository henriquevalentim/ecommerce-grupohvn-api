//Define as rotas
let app = require('express').Router()

const AddressController = require('../controllers/address')

const isAuthenticated = require('../middlewares/isAuthenticated')

app.post('/register', isAuthenticated, (req, res) =>
  AddressController.create(req, res)
)
app.get('/user', isAuthenticated, (req, res) =>
  AddressController.getAdressUser(req, res)
)

module.exports = app
