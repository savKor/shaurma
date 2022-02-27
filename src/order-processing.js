import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createHeader } from './header'
import { createFooter } from './footer'
import { fetchShaurma } from './api/fetch-array'
import {
  addCoordonatesInOrder,
  addShaurmanInArray,
  createOrderForm,
  enableDeleteShaurmaForOrder,
  enableMainWithModal,
  handleAdditiveButtonsAfterOpenModal,
  markDeleteShaurmaFromOrderList,
  markThatModalWasOpen,
  onChangeOrder,
} from './order/index'
import { fetchAdditive } from './api/fetch-additive-array'
import { displayMap, enableMapCoordinates } from './order/map'
import { deleteShaurmaInUserCart } from './api/fetch-cart'

let shaurmaList = []
let additiveList = []
const coordinate = {}

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
  await displayMap()
}

let chosenShaurmaForAdditive

async function addShaurmaInOrder() {
  shaurmaList = await fetchShaurma()
  addShaurmanInArray(shaurmaList)
}

async function addMapCoordinates(coordinates) {
  coordinate.weight = coordinates[1]
  coordinate.heigh = coordinates[0]
  console.log(coordinate)
  addCoordonatesInOrder(coordinate)
}

async function onDeleteInCar(shaurmaId) {
  await deleteShaurmaInUserCart({ shaurmaId })
  markDeleteShaurmaFromOrderList(shaurmaId)
}

async function handleClickToOpenAdditiveModal(shaurmaId) {
  additiveList = await fetchAdditive()
  chosenShaurmaForAdditive = shaurmaId
  markThatModalWasOpen(additiveList, shaurmaId)
}

async function addAdditive(additiveId, eventName) {
  onChangeOrder(additiveId, eventName, chosenShaurmaForAdditive)
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
  enableMapCoordinates(addMapCoordinates)
  enableDeleteShaurmaForOrder(onDeleteInCar)
}

render()

console.log(window.location.href)
