const mongoose = require('mongoose')

const { Schema } = mongoose

const shaurmaSchema = new Schema({
  image: String,
  name: String,
  cost: Number,
  createdAt: Date,
})

// подключение
mongoose.connect('mongodb://localhost:27017/shaurmadb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const Shaurma = mongoose.model('Shaurma', shaurmaSchema)

Shaurma.save((err) => {
  mongoose.disconnect() // отключение от базы данных

  if (err) return console.log(err)
  console.log('Сохранен объект', Shaurma)

  return undefined
})
