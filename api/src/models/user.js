const mongoose = require('mongoose')

// User Collection
const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  createdAt: Date,
})

const User = mongoose.model('users', UserSchema)

module.exports = User
