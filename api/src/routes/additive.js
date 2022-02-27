const express = require('express')

const additiveRoutes = express.Router()

const Additive = require('../models/additive')

async function getAdditiveList() {
  const promise = new Promise((resolve) => {
    Additive.find({}, (err, docs) => {
      resolve(docs)
    })
  })

  return promise
}

additiveRoutes.get('/additive', async (request, response) => {
  const additiveList = await getAdditiveList()
  console.log(additiveList)
  response.send(additiveList)
})

module.exports = additiveRoutes
