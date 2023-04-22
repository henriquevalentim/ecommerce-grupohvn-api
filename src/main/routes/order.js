//Define as rotas
let app = require('express').Router()

const OrderController = require('../controllers/order')

const isAuthenticated = require('../middlewares/isAuthenticated')

app.post('/process', isAuthenticated, (req, res) =>
  OrderController.processOrder(req, res)
)

module.exports = app
