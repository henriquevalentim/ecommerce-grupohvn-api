const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const database = require('./infra/config/database')
const userRoutes = require('./main/routes/user')
const addressRoutes = require('./main/routes/address')
const payment = require('./main/routes/payment')
const product = require('./main/routes/product')
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/user', userRoutes)
app.use('/address', addressRoutes)
app.use('/product', product)
app.use('/payment', payment)

app.listen(PORT)
