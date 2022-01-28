// Imports
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const config = require('../config')
const authMiddleware = require('./middleware/auth')
const User = require('../models/user')

// Common Routes
const userRoutes = express.Router()

const userExample = {
  username: 'savva',
  password: '123',
}

// Register
userRoutes.post('/user/register', (request, response) => {
  const responseData = {
    success: false,
    data: {},
    errors: [],
  }

  if (userExample.username !== '') {
    // Check user exists
    User.findOne({ username: userExample.username }, (error, document) => {
      if (!document) {
        // User does not exists

        // Hash password
        bcrypt.hash(
          userExample.password,
          config.saltRounds,
          (hashError, hashPassword) => {
            if (!hashError) {
              // Define new user
              const user = {
                username: userExample.username,
                password: hashPassword,
                createdAt: new Date(),
              }

              // Save into database
              User.create(user, (errorCreate, documentCreate) => {
                const userId = documentCreate._id

                if (userId) {
                  responseData.success = true
                  responseData.data.userId = userId
                } else {
                  responseData.errors.push({
                    type: 'default',
                    message: 'Please try again.',
                  })
                }

                response.json(responseData)
              })
            } else {
              responseData.errors.push({
                type: 'default',
                message: 'Please try again.',
              })
            }
          },
        )
      } else {
        // User already exists

        responseData.errors.push({
          type: 'warning',
          message: 'The username is taken. Please choose something else.',
        })

        response.json(responseData)
      }
    })
  } else {
    responseData.errors.push({
      type: 'critical',
      message: 'Username not provided.',
    })

    response.json(responseData)
  }
})

// Export
module.exports = userRoutes
