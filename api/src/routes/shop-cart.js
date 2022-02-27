const express = require('express')
const jwtDecode = require('jwt-decode')
const mongoose = require('mongoose')

const UserShaurma = require('../models/shop-cart')

const cartRoutes = express.Router()

cartRoutes.post('/user/cart-list', async (request, response) => {
  const responseData = {
    success: false,
    data: {},
    errors: [],
  }
  const userToken = request.get('x-access-token')
  const decoded = jwtDecode(userToken)
  const userShaurmaAddedInCart = request.body.shaurmaId

  const document = await UserShaurma.findOne({ userId: decoded._id })

  // Save into database
  if (!document) {
    const cartShaurma = {
      userId: mongoose.Types.ObjectId(decoded._id),
      shaurmaList: [mongoose.Types.ObjectId(userShaurmaAddedInCart)],
    }

    UserShaurma.create(cartShaurma, (err, documentCreate) => {
      // при создании нового пользователя documentCreate выдаёт null во время доваления шаурмы в карзину позователя
      const cartId = documentCreate._id
      if (cartId) {
        responseData.success = true
        responseData.data.cartId = cartId
      }

      response.json(responseData)
    })
  } else {
    if (document.shaurmaList.includes(userShaurmaAddedInCart)) {
      responseData.errors.push({
        type: 'critical',
        message: 'Please try again.',
      })

      response.json(responseData)
    } else {
      UserShaurma.updateOne(
        { userId: mongoose.Types.ObjectId(decoded._id) },
        {
          $push: {
            shaurmaList: mongoose.Types.ObjectId(userShaurmaAddedInCart),
          },
        },
        () => {
          const cartId = document._id
          if (cartId) {
            responseData.success = true
            responseData.data.cartId = cartId
          }

          response.json(responseData)
        },
      )
    }
  }
})

cartRoutes.post('/user/cart-list/deleted', async (request, response) => {
  const responseData = {
    success: false,
    data: {},
    errors: [],
  }

  const userToken = request.get('x-access-token')
  const decoded = jwtDecode(userToken)
  const userShaurmaAddedInCart = request.body.shaurmaId
  const document = await UserShaurma.findOne({ userId: decoded._id })

  if (document) {
    UserShaurma.updateOne(
      { userId: mongoose.Types.ObjectId(decoded._id) },
      {
        $pull: {
          shaurmaList: mongoose.Types.ObjectId(userShaurmaAddedInCart),
        },
      },
      () => {
        const cartId = document._id
        if (cartId) {
          responseData.success = true
          responseData.data.cartId = cartId
        }

        response.json(responseData)
      },
    )
  }
})

module.exports = cartRoutes
