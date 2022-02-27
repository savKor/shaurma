const express = require('express')
const jwtDecode = require('jwt-decode')
const mongoose = require('mongoose')

const UserShaurma = require('../models/shop-cart')

const OrderShaurma = require('../models/order')

const orderRoutes = express.Router()

orderRoutes.post('/order', async (request, response) => {})
