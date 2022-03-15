import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createHeader } from './header'
import { createFooter } from './footer'
import 'mapbox-gl/dist/mapbox-gl.css'

import { fetchShaurma } from './api/fetch-array'
import {
  addShaurmanInArray,
  changeArrayOnDeleteShaurma,
  createOrderForm,
  enableDeleteShaurmaForOrder,
  enableMainWithModal,
  enableOrderYourOrder,
  handleAdditiveButtonsAfterOpenModal,
  markDeleteShaurmaFromOrderList,
  markThatModalWasOpen,
  onChangeOrder,
} from './order/index'
import { fetchAdditive } from './api/fetch-additive-array'
import { deleteShaurmaInUserCart } from './api/fetch-cart'
import { displayMap } from './order/map'
import { addOrderToDatabase } from './api/fetch-order'

let shaurmaList = []
let additiveList = []
let coordinates
let chosenShaurmaForAdditive

async function renderPageTemplate() {
  shaurmaList = await fetchShaurma()
  additiveList = await fetchAdditive()
  const order = true
  const headerHTML = createHeader(shaurmaList, order)
  const mainHTML = createOrderForm(shaurmaList, additiveList)
  const footerHTML = createFooter()

  document.body.insertAdjacentHTML('afterbegin', footerHTML)
  document.body.insertAdjacentHTML('afterbegin', mainHTML)
  document.body.insertAdjacentHTML('afterbegin', headerHTML)
  await displayMap(getCoordinates)
}

async function addShaurmaInOrder() {
  shaurmaList = await fetchShaurma()
  addShaurmanInArray(shaurmaList)
}

// async function addMapCoordinates(coordinates) {
//   coordinate.weight = coordinates[1]
//   coordinate.heigh = coordinates[0]
//   console.log(coordinate)
//   addCoordonatesInOrder(coordinate)
// }

async function onDeleteInCar(shaurmaId) {
  await deleteShaurmaInUserCart({ shaurmaId })
  markDeleteShaurmaFromOrderList(shaurmaId)
  changeArrayOnDeleteShaurma(shaurmaId)
}

async function handleClickToOpenAdditiveModal(shaurmaId) {
  additiveList = await fetchAdditive()
  chosenShaurmaForAdditive = shaurmaId
  markThatModalWasOpen(additiveList, shaurmaId)
}

async function addAdditive(additiveId, eventName) {
  onChangeOrder(additiveId, eventName, chosenShaurmaForAdditive)
}

async function handleOrderButton(shaurmaOrdered) {
  if (coordinates !== undefined) {
    console.log(coordinates)
    console.log(shaurmaOrdered)
    addOrderToDatabase({ shaurmaOrdered, coordinates })
  }
  // await deleteShaurmaFromMain({ fullInfoAboutOrderedShaurma, coordinates })
}

async function getCoordinates(addressCoonrdinates) {
  coordinates = addressCoonrdinates.result
  console.log(coordinates)
  console.log(coordinates.id)
}
// async function deleteShaurmaFromCart(shaurmaId) {
//   await deleteShaurmaInUserCart({ shaurmaId })
//   markShaurmaItemDeletedFromCartForMain(shaurmaId)
//   markShaurmaDeletedInCartForHeader(shaurmaId, shaurmaList)
// }

async function render() {
  await renderPageTemplate()
  await addShaurmaInOrder()
  enableMainWithModal(handleClickToOpenAdditiveModal)
  handleAdditiveButtonsAfterOpenModal(addAdditive)
  enableDeleteShaurmaForOrder(onDeleteInCar)
  enableOrderYourOrder(handleOrderButton)
}

render()
