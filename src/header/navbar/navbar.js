import { createLogo } from './logo/logo'
import {
  createNavigation,
  enableExitButton,
  enableNavigation,
  markShaurmaAddedInCartNavigation,
  markShaurmaDeletedInCartNavigation,
} from './navigation/navigation'

export function createNavbar(shaurmaList, order) {
  const getLogo = createLogo()
  const getNavigation = createNavigation(shaurmaList, order)

  const navbarHTML = /* html */ `
        <div class ="navbar navbar-dark bg-dark">
            <div class="container">
                ${getLogo}
                ${getNavigation}
            </div>
        </div>
    `
  return navbarHTML
}

export function enableNavbar(onAddInCart) {
  enableExitButton()
  enableNavigation(onAddInCart)
}

export function markShaurmaAddedInCartForNavbar(shaurmaId, shaurmaList) {
  markShaurmaAddedInCartNavigation(shaurmaId, shaurmaList)
}

export function markShaurmaDeletedInCartForNavbar(shaurmaId, shaurmaList) {
  markShaurmaDeletedInCartNavigation(shaurmaId, shaurmaList)
}
