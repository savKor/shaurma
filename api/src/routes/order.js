const express = require('express')
const jwtDecode = require('jwt-decode')
const mongoose = require('mongoose')

const OrderShaurma = require('../models/order')

const Shaurma = require('../models/shaurma')

const Additive = require('../models/additive')

const orderRoutes = express.Router()

orderRoutes.post('/order', async (request, response) => {
  const responseData = {
    success: false,
    data: {},
    errors: [],
  }
  const userToken = request.get('x-access-token')
  const decoded = jwtDecode(userToken)

  const orderedShaurma = request.body.shaurmaOrdered

  const orderCoordinates = request.body.coordinates

  const fullShaurmaOrderList = getArrayOfShaurmaOrder()

  function getArrayOfShaurmaOrder() {
    const infoAboutShaurma = []

    addShaurmaIdToOrder(infoAboutShaurma)
    return infoAboutShaurma
  }

  function addShaurmaIdToOrder(infoAboutShaurma) {
    for (let i = 0; i < orderedShaurma.length; i++) {
      const shaurma = mongoose.Types.ObjectId(orderedShaurma[i].shaurmaId)
      const thisShaurma = orderedShaurma[i]
      const additive = addAdditiveIdToOrder(thisShaurma)
      infoAboutShaurma.push({ shaurmaId: shaurma, additiveId: additive })
    }
  }

  function addAdditiveIdToOrder(yourOrder) {
    const additiveList = []
    for (let j = 0; j < yourOrder.additiveIdList.length; j++) {
      const additive = mongoose.Types.ObjectId(yourOrder.additiveIdList[j])
      additiveList.push(additive)
    }
    return additiveList
  }

  async function getShaurma() {
    const id = []
    for (let i = 0; i < orderedShaurma.length; i++) {
      const shaurma = orderedShaurma[i].shaurmaId
      id.push(shaurma)
    }
    const shaurma = await Shaurma.find({ _id: { $in: id } })
    return shaurma
  }

  async function getAdditive() {
    const additiveList = []
    for (let i = 0; i < orderedShaurma.length; i++) {
      const document = addAdditive(orderedShaurma[i])
      additiveList.push(document)
    }
    const additive = await Promise.all(additiveList)
    return additive
  }

  async function addAdditive(orderedAdditive) {
    const id = []
    for (let j = 0; j < orderedAdditive.additiveIdList.length; j++) {
      const additive = orderedAdditive.additiveIdList[j]
      id.push(additive)
    }
    const document = await Additive.find({ _id: { $in: id } })
    return document
  }

  async function calculationOfCost() {
    const shaurma = await getShaurma()
    const additive = await getAdditive()

    const cost = 0
    for (let i = 0; i < orderedShaurma.length; i++) {
      const shaurmaCost = shaurma[i].cost
      cost = +shaurmaCost
      const additiveCost = calculateAdditiveCost(additive, orderedShaurma[i])
      cost = +additiveCost
    }
    return cost
  }

  console.log(await calculationOfCost())
  function calculateAdditiveCost(additive, orderedAdditive) {
    let additiveCost
    for (let i = 0; i < orderedAdditive.additiveIdList.length; i++) {
      additiveCost = +additive[i].cost
    }
    return additiveCost
  }

  // Save into database
  const cartShaurma = {
    userId: mongoose.Types.ObjectId(decoded._id),
    location: {
      idLocation: orderCoordinates.id,
      placeName: orderCoordinates.place_name,
    },
    shaurmaList: fullShaurmaOrderList,
  }

  console.log(cartShaurma)

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
