const config = require('./config')
const appServer = require('./server')

// Boot Server
const port = process.env.PORT || config.port

appServer.listen(port, () => {
  console.log('Server running on', port)
})
