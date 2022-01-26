const mongoose = require('mongoose')
const express = require('express')
let cors = require('cors')

const app = express()
//turn off CORS
app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

//Обращение к базе данных
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/shaurmadb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

let shaurmaSchema = new Schema(
  { image: String, sname: String, cost: Number, createdAt: Date },
  { collection: 'shaurma' },
)

const Shaurma = mongoose.model('Shaurma', shaurmaSchema)

async function getShaurmaList() {
  let promise = new Promise(function (resolve, reject) {
    Shaurma.find({}, function (err, docs) {
      resolve(docs)
    })
  })

  return promise
}

app.get('/', function (request, response) {
  response.send('<h1>Сервак запущен</h1>')
})

app.use('/shaurma-list', async function (request, response) {
  const shaurmaList = await getShaurmaList()
  console.log(shaurmaList)
  response.send(shaurmaList)
})

app.listen(3000)

/**
 * Ввести данные в поля регистрации
 * Передать их на бэкенд
 * На бекенде записать эти данные в объект
 * А так де захэштровать пароль
 * Этот объект добавить в базу данных пользователей
 */
