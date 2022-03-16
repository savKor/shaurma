const mongoose = require('mongoose')

// User Collection
const OrderSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  cost: Number,
  location: {
    idLocation: String,
    placeName: String,
  },
  shaurmaList: [
    {
      shaurmanId: mongoose.Types.ObjectId,
      additiveId: [mongoose.Types.ObjectId],
    },
  ],
})

const UserOrder = mongoose.model('orders', OrderSchema)

module.exports = UserOrder
