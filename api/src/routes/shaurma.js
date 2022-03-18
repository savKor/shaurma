const express = require('express')

const mongoose = require('mongoose')

const shaurmaRoutes = express.Router()

const jwtDecode = require('jwt-decode')

const Shaurma = require('../models/shaurma')

const UserShaurma = require('../models/shop-cart')

async function getShaurmaList() {
  const promise = new Promise((resolve) => {
    Shaurma.find({}, (err, docs) => {
      resolve(docs)
    })
  })

  return promise
}

shaurmaRoutes.get('/shaurma-list', async (request, response) => {
  const userToken = request.get('x-access-token')
  const operation = [getShaurmaList()]
  let userShaurmaAddedInCart = []

  if (userToken !== undefined) {
    const decoded = jwtDecode(userToken)
    operation.push(UserShaurma.findOne({ userId: decoded._id }))
  }

  const [shaurmaList, userShaurma] = await Promise.all(operation)

  if (userShaurma) {
    userShaurmaAddedInCart = userShaurma.shaurmaList
  }

  const shaurmaListWithShaurmaInfo = shaurmaList.map(function (shaurmaItem) {
    const { _id, name, cost, image, createdAt } = shaurmaItem

    const newShaurmaItem = {
      _id,
      name,
      cost,
      image,
      createdAt,
      inCart: userShaurmaAddedInCart.includes(shaurmaItem.id),
    }
    return newShaurmaItem
  })

  response.send(shaurmaListWithShaurmaInfo)
})

shaurmaRoutes.post('/shaurma-list/deleted', async (request, response) => {
  const responseData = {
    success: false,
    data: {},
    errors: [],
  }

  const userShaurmaAddedInCart = request.body.shaurmaId
  const document = await Shaurma.findOne({ _id: userShaurmaAddedInCart })
  console.log(document)
  if (document) {
    Shaurma.deleteOne(
      { _id: mongoose.Types.ObjectId(userShaurmaAddedInCart) },
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

module.exports = shaurmaRoutes
