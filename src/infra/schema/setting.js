const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Setting = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: false },
  type: { type: String, required: true },
  metadatas: [{ key: String, value: String }]
})

module.exports = mongoose.model('Setting', Setting)
