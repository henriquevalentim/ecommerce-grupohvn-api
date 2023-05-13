const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
  userId: { type: String, required: true },
  addressId: { type: String, required: false },
  sendMethod: { type: String, required: false },
  paymentMethod: { type: String, required: true },
  creditCardId: { type: String, required: false },
  installments: { type: Number, required: false },
  status: { type: String, required: true },
  products: [
    {
      code: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  metadata: [{ key: String, value: String }],
  total: { type: Number, required: true },
  registerDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', Order)
