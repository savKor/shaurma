const mongoose = require('mongoose')

// User Collection
const OrderSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  cost: Number,
  shaurmaList: [
    {
      shaurmanID: mongoose.Types.ObjectId,
      cost: Number,
      additive: [{ additiveId: mongoose.Types.ObjectId, cost: Number }],
    },
  ],
  location: {},
})

const UserOrder = mongoose.model('UserOrder', OrderSchema)

module.exports = UserOrder
