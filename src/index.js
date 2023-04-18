const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const database = require('./infra/config/database')
const userRoutes = require('./main/routes/user')
const addressRoutes = require('./main/routes/address')
const product = require('./main/routes/product')
const payment = require('./main/routes/payment')
const creditCard = require('./main/routes/creditCard')
const setting = require('./main/routes/setting')
const frete = require('./main/routes/frete')
const PORT = process.env.PORT || 3000

const app = express()

console.log('teste', process.env.MONGO_HOST)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/user', userRoutes)
app.use('/address', addressRoutes)
app.use('/product', product)
app.use('/creditCard', creditCard)
app.use('/payment', payment)
app.use('/setting', setting)
app.use('/frete', frete)

app.listen(PORT)
