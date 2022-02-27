// Imports
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const config = require('../config')
const authMiddleware = require('./middleware/auth')
const User = require('../models/user')

// Common Routes
const userRoutes = express.Router()

// Register
userRoutes.post('/user/register', (request, response) => {
  const responseData = {
    success: false,
    data: {},
    errors: [],
  }

  if (request.body.username !== '') {
    // Check user exists
    User.findOne({ username: request.body.username }, (error, document) => {
      if (!document) {
        // User does not exists

        // Hash password
        bcrypt.hash(
          request.body.password,
          config.saltRounds,
          (hashError, hashPassword) => {
            if (!hashError) {
              // Define new user
              const user = {
                username: request.body.username,
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

// Login
userRoutes.post('/user/login', authMiddleware, (request, response) => {
  const responseData = {
    success: false,
    data: {},
    errors: [],
  }

  if (request.body.username) {
    User.findOne({ username: request.body.username }, (error, document) => {
      if (error) {
        responseData.errors.push({ type: 'critical', message: error })

        response.json(responseData)
      } else if (!document) {
        responseData.errors.push({
          type: 'warning',
          message: 'No user exists with this username.',
        })

        response.json(responseData)
      } else {
        bcrypt.compare(
          request.body.password,
          document.password,
          (hashError, hashPasswordCheck) => {
            if (!hashError) {
              if (hashPasswordCheck) {
                responseData.data.token = jwt.sign(
                  { username: document.username, _id: document._id },
                  config.secret,
                )
                responseData.success = true
              } else {
                responseData.errors.push({
                  type: 'critical',
                  message: 'The password is incorrect.',
                })
              }

              response.json(responseData)
            } else {
              responseData.errors.push({
                type: 'critical',
                message: 'Please try again.',
              })

              response.json(responseData)
            }
          },
        )
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
