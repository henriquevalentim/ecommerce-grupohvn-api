const mongoose = require('mongoose')
const MONGO_HOST = process.env.MONGO_HOST
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}`

mongoose.connect(url, { useNewUrlParser: true })
