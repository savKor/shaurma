const mongoose = require('mongoose')

// User Collection
const OrderSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  cost: Number,
  location: {
    idLocation: String,
    placeName: String,
    placeNameRu: String,
    properties: {
      address: String,
      category: String,
      foursquare: String,
      landmark: Boolean,
    },
  },
  shaurmaList: [
    {
      shaurmanId: mongoose.Types.ObjectId,
      additiveId: [mongoose.Types.ObjectId],
    },
  ],
})

const UserOrder = mongoose.model('order', OrderSchema)

module.exports = UserOrder
