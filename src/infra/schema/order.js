const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
  userId: { type: String, required: true },
  addressId: { type: String, required: true },
  sendMethod: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  creditCardId: { type: String, required: false },
  installments: { type: Number, required: true },
  status: { type: String, required: true },
  products: [
    {
      code: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  registerDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', Order)
