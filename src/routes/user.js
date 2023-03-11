//Define as rotas
let app = require('express').Router()

const UserController = require('../controller/user')

app.route('/').post((req, res) => UserController.create(req, res))
app.route('/login').post((req, res) => UserController.login(req, res))

module.exports = app
