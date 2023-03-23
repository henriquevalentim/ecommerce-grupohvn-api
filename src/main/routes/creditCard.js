//Define as rotas
let app = require('express').Router()

const CreditCardController = require('../controllers/creditCard')

const isAuthenticated = require('../middlewares/isAuthenticated')

app.post('/', isAuthenticated, (req, res) =>
  CreditCardController.create(req, res)
)

app.put('/setMainCreditCard/:idCreditCard', isAuthenticated, (req, res) =>
  CreditCardController.setMainCreditCard(req, res)
)

app.get('/', isAuthenticated, (req, res) =>
  CreditCardController.getCreditCardsByUser(req, res)
)

module.exports = app
