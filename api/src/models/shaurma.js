const mongoose = require('mongoose')

const { Schema } = mongoose

const shaurmaSchema = new Schema(
  { image: String, name: String, cost: Number, createdAt: Date },
  { collection: 'shaurma' },
)

const Shaurma = mongoose.model('shaurma', shaurmaSchema)

module.exports = Shaurma
