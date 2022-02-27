import {
  createCart,
  enableCart,
  markNewShaurmaAddedInCart,
  markShaurmaItemAddedInCart,
  markShaurmaItemDeletedInCart,
  markShaurmaItemDeletedInCartInsideCart,
} from './cart/cart'
import { createExitButton } from './exit/exit'
import { createSignUpButton } from './sing-up/sign-up'
import { createNick } from './nickname/nickname'
import { storage } from '../../../storage'
import { createBackButton } from './back/back-button'

function handleHeaderNavigationAfterBegining() {
  let headerElement = []
  if (storage.user.loggedIn) {
    const nickHTML = createNick(storage.user.username)
    const exitHTML = createExitButton()
    headerElement = [nickHTML, exitHTML]
  } else {
    const singUpButtonHTML = createSignUpButton()
    headerElement = [singUpButtonHTML]
  }
  return headerElement
}

export function createNavigation(shaurmaList, order) {
  const navigationElement = handleHeaderNavigationAfterBegining()
  const cartHTML = createCart(shaurmaList)
  const backHTML = createBackButton()
  let navigationHTML
  if (!order) {
    navigationHTML = /* html */ `
        <div class="col-4" id="option-elements">
            ${cartHTML}
            ${navigationElement}
        </div>
    `
  } else {
    navigationHTML = /* html */ `
        <div class="col-4" id="option-elements">
        ${backHTML}
        </div>
    `
  }
  return navigationHTML
}

export function enableExitButton() {
  if (storage.user.loggedIn) {
    document
      .getElementById('exit-button')
      .addEventListener('click', onExitClick)
  }
}

export function enableNavigation(onAddInCart) {
  enableCart(onAddInCart)
}

function onExitClick() {
  localStorage.removeItem('token')
  window.location.href = '/html/home.html'
}

export function markShaurmaAddedInCartNavigation(shaurmaId, shaurmaList) {
  markNewShaurmaAddedInCart(shaurmaId, shaurmaList)
  markShaurmaItemAddedInCart()
}

export function markShaurmaDeletedInCartNavigation(shaurmaId, shaurmaList) {
  markShaurmaItemDeletedInCart()
  markShaurmaItemDeletedInCartInsideCart(shaurmaId, shaurmaList)
}
