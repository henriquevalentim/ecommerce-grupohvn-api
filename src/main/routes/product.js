//Define as rotas
let app = require('express').Router()

const ProductController = require('../controllers/product')

const isAuthenticated = require('../middlewares/isAuthenticated')
const isAuthenticadedAdmin = require('../middlewares/isAuthenticatedAdmin')

app.post('/', isAuthenticadedAdmin, (req, res) =>
  ProductController.create(req, res)
)
app.get('/', isAuthenticated, (req, res) =>
  ProductController.getAllProducts(req, res)
)
app.delete('/:idProduct', isAuthenticadedAdmin, (req, res) =>
  ProductController.deleteProductById(req, res)
)
app.post(
  '/addTechnicalInformation/:idProduct',
  isAuthenticadedAdmin,
  (req, res) => ProductController.addTechnicalInformation(req, res)
)

module.exports = app
