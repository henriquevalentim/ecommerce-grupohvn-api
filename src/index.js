const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const database = require('./config/database')
const userRoutes = require('./routes/user')
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/user', userRoutes)

app.listen(PORT)
