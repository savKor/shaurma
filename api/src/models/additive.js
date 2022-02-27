const mongoose = require('mongoose')

const { Schema } = mongoose

const additiveSchema = new Schema(
  {
    image: String,
    name: String,
    cost: Number,
    shaurmaId: [mongoose.Types.ObjectId],
  },
  { collection: 'additive' },
)

const Additive = mongoose.model('additive', additiveSchema)

module.exports = Additive
