//Define as rotas
let app = require('express').Router()

const FreteController = require('../controllers/frete')

app.get('/:cep', (req, res) => FreteController.getFrete(req, res))

module.exports = app
