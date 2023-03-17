const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Address = new Schema({
  name: { type: String, required: true },
  zipCode: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  uf: { type: String, required: true },
  complement: { type: String, required: false },
  userId: { type: String, required: true },
  isMain: { type: Boolean, required: true, default: false },
  registerDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Address', Address)
