//Define as rotas
let app = require('express').Router()

const PaymentController = require('../controllers/payment')

const isAuthenticated = require('../middlewares/isAuthenticated')

app.post('/', isAuthenticated, (req, res) =>
  PaymentController.payCreditCard(req, res)
)

module.exports = app
