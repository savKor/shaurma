const express = require('express')
const jwtDecode = require('jwt-decode')
const mongoose = require('mongoose')

const OrderShaurma = require('../models/order')

const orderRoutes = express.Router()

orderRoutes.post('/order', async (request, response) => {
  const responseData = {
    success: false,
    data: {},
    errors: [],
  }
  const userToken = request.get('x-access-token')
  const decoded = jwtDecode(userToken)

  const orderedShaurman = request.body.shaurmaOrdered

  const orderCoordinates = request.body.coordinates

  // Save into database
  const cartShaurma = {
    userId: mongoose.Types.ObjectId(decoded._id),
    location: {
      idLocation: orderCoordinates.id,
      placeName: orderCoordinates.place_name,
    },
    shaurmaList: [
      {
        shaurmanId: mongoose.Types.ObjectId(orderedShaurman.shaurmaId),
        additiveId: [mongoose.Types.ObjectId(orderedShaurman.additiveIdList)],
      },
    ],
  }

  OrderShaurma.create(cartShaurma, (err, documentCreate) => {
    const orderId = documentCreate._id
    if (orderId) {
      responseData.success = true
      responseData.data.orderId = orderId
    }

    response.json(responseData)
  })
})

module.exports = orderRoutes
