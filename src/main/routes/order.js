//Define as rotas
let app = require('express').Router()

const OrderController = require('../controllers/order')

const isAuthenticated = require('../middlewares/isAuthenticated')
const isAuthenticadedAdmin = require('../middlewares/isAuthenticatedAdmin')

app.get('/user', isAuthenticated, (req, res) =>
  OrderController.getOrdersByUser(req, res)
)

// app.get('/', isAuthenticadedAdmin, (req, res) =>
//   OrderController.getOrders(req, res)
// )

app.post('/process', isAuthenticated, (req, res) =>
  OrderController.processOrder(req, res)
)

module.exports = app
