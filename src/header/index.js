import {
  createNavbar,
  enableNavbar,
  markShaurmaAddedInCartForNavbar,
  markShaurmaDeletedInCartForNavbar,
} from './navbar/navbar'

export function createHeader(shaurmaList, order) {
  const navbarHTML = createNavbar(shaurmaList, order)

  const headerHTML = /* html */ `
        <header> 
            ${navbarHTML} 
        </header>
    `
  return headerHTML
}

export function enableHeader(onAddInCart) {
  enableNavbar(onAddInCart)
}
export function markShaurmaAddedInCartForHeader(shaurmaId, shaurmaList) {
  markShaurmaAddedInCartForNavbar(shaurmaId, shaurmaList)
}

export function markShaurmaDeletedInCartForHeader(shaurmaId, shaurmaList) {
  markShaurmaDeletedInCartForNavbar(shaurmaId, shaurmaList)
}
