const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  urlImage: { type: String, required: false },
  status: { type: Boolean, required: true, default: true },
  technicalInformation: [{ key: String, value: String }],
  registerDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Product', Product)
