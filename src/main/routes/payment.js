//Define as rotas
let app = require('express').Router()

const PaymentController = require('../controllers/payment')

const isAuthenticated = require('../middlewares/isAuthenticated')

app.post('/', isAuthenticated, (req, res) =>
  PaymentController.payCreditCard(req, res)
)

app.post('/receiveNotification', (req, res) =>
  PaymentController.receiveNotification(req, res)
)

app.post('/generatePaymentLink', (req, res) =>
  PaymentController.generatePaymentLink(req, res)
)

module.exports = app
