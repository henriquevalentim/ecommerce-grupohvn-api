//Define as rotas
let app = require('express').Router()

const AddressController = require('../controllers/address')

const isAuthenticated = require('../middlewares/isAuthenticated')

app.post('/register', isAuthenticated, (req, res) =>
  AddressController.create(req, res)
)

module.exports = app
