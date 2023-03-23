//Define as rotas
let app = require('express').Router()

const ProductController = require('../controllers/product')

const isAuthenticated = require('../middlewares/isAuthenticated')

app.post('/', isAuthenticated, (req, res) => ProductController.create(req, res))

module.exports = app
