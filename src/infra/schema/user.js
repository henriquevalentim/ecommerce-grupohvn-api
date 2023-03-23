const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: Date, required: true },
  cpf: { type: String, required: true },
  password: { type: String, required: true },
  genre: { type: String, required: false },
  status: { type: Boolean, required: true, default: true },
  permission: [{ type: String, required: false }],
  registerDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', User)
