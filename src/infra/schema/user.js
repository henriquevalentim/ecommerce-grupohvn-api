const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: Date, required: false },
  cpf: { type: String, required: false },
  password: { type: String, required: false },
  genre: { type: String, required: false },
  status: { type: Boolean, required: true, default: true },
  permission: [{ type: String, required: false }],
  typeLogin: { type: String, required: false, default: 'email' },
  registerDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', User)
