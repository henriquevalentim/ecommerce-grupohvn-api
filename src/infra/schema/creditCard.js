const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CreditCard = new Schema({
  shopperReference: { type: String, required: true }, // ID do usuário
  dueDate: { type: String, required: true }, // Data de vencimento
  brand: { type: String, required: true }, // Bandeira do cartão
  recurringDetailReference: { type: String, required: true }, // ID do cartão
  lastFourDigits: { type: String, required: true }, // Últimos 4 dígitos do cartão
  firstEightDigits: { type: String, required: true }, // Primeiros 8 dígitos do cartão
  isMain: { type: Boolean, default: false }, // Cartão principal
  registerDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('CreditCard', CreditCard)
