import './style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  createHeader,
  enableHeader,
  markShaurmaAddedInCartForHeader,
  markShaurmaDeletedInCartForHeader,
} from './header'
import { createFooter } from './footer'
import {
  createMain,
  enableMain,
  markShaurmaAddedInCartForMain,
  markShaurmaItemDeletedFromCartForMain,
  markShaurmaItemDeletedFromMainInHome,
} from './home-content'
import { deleteShaurmaFromMain, fetchShaurma } from './api/fetch-array'
import { deleteShaurmaInUserCart, putShaurmaInUserCart } from './api/fetch-cart'

let shaurmaList = []

async function renderPageTemplate() {
  shaurmaList = await fetchShaurma()

  const headerHTML = createHeader(shaurmaList)
  const mainHTML = createMain(shaurmaList)
  const footerHTML = createFooter()

  document.body.insertAdjacentHTML('afterbegin', footerHTML)
  document.body.insertAdjacentHTML('afterbegin', mainHTML)
  document.body.insertAdjacentHTML('afterbegin', headerHTML)
}

async function addShaurmaInCart(shaurmaId) {
  shaurmaList = await fetchShaurma()
  await putShaurmaInUserCart({ shaurmaId })
  markShaurmaAddedInCartForMain(shaurmaId)
  markShaurmaAddedInCartForHeader(shaurmaId, shaurmaList)
}

async function deleteShaurma(shaurmaId) {
  shaurmaList = await fetchShaurma()
  await deleteShaurmaFromMain({ shaurmaId })
  markShaurmaItemDeletedFromMainInHome(shaurmaId)
  markShaurmaDeletedInCartForHeader(shaurmaId, shaurmaList)
}

async function deleteShaurmaFromCart(shaurmaId) {
  await deleteShaurmaInUserCart({ shaurmaId })
  markShaurmaItemDeletedFromCartForMain(shaurmaId)
  markShaurmaDeletedInCartForHeader(shaurmaId, shaurmaList)
}

async function render() {
  await renderPageTemplate()
  enableMain(addShaurmaInCart, deleteShaurma)
  enableHeader(deleteShaurmaFromCart)
}

render()

console.log(window.location.href)
