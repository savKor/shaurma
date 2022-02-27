const mongoose = require('mongoose')

// User Collection
const CartSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  shaurmaList: [mongoose.Types.ObjectId],
})

const UserShaurma = mongoose.model('UserShaurma', CartSchema)

module.exports = UserShaurma
