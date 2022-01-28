// Imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config')
const commonRoutes = require('./routes')
const userRoutes = require('./routes/user')
// Setup
const apiServer = express()
apiServer.set('APP_SECRET', config.secret)

// MongoDB (mongoose)
mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// Enable CORS
apiServer.use(cors())

// Body Parser
apiServer.use(bodyParser.urlencoded({ extended: false }))
apiServer.use(bodyParser.json())

// Cookie Parser
apiServer.use(cookieParser())

// Routes
apiServer.use(commonRoutes)
apiServer.use(userRoutes)

// Export
module.exports = apiServer
