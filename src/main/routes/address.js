//Define as rotas
let app = require('express').Router()

const AddressController = require('../controllers/address')

const isAuthenticated = require('../middlewares/isAuthenticated')

app.post('/register', isAuthenticated, (req, res) =>
  AddressController.create(req, res)
)
app.put('/setMainAddress', isAuthenticated, (req, res) =>
  AddressController.updateMainAddress(req, res)
)
app.put('/:idAddress', isAuthenticated, (req, res) =>
  AddressController.updateAddress(req, res)
)
app.delete('/:idAddress', isAuthenticated, (req, res) =>
  AddressController.deleteAdressUser(req, res)
)
app.get('/user', isAuthenticated, (req, res) =>
  AddressController.getAdressUser(req, res)
)

module.exports = app
