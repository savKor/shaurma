// Imports
const express = require('express')

const authMiddleware = require('./middleware/auth')

// Common Routes
const commonRoutes = express.Router()

// Root
commonRoutes.get('/', authMiddleware, (request, response) => {
  const responseData = {
    success: false,

    errors: {},
  }

  response.json(responseData)
})

// Export
module.exports = commonRoutes
