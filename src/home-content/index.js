import {
  enableShaurmaList,
  getShaurma,
  markShaurmaItemAddedInCart,
  markShaurmaItemDeletedFromCart,
  markShaurmaItemDeletedFromMain,
} from './list/shaurma-list'

export function createMain(list) {
  const listOfShaurma = getShaurma(list)
  const mainHTML = /* html */ `
        <main id="main-form">
            <div class="container">
                <div id="card-list" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-md-3 row-cols-md-4 g-3">
                ${listOfShaurma}
                </div>
            </div>
        </main>
    `
  return mainHTML
}

export function enableMain(onAddInCart, onDeleteInCart) {
  enableShaurmaList(onAddInCart, onDeleteInCart)
}

export function markShaurmaAddedInCartForMain(shaurmaId) {
  markShaurmaItemAddedInCart(shaurmaId)
}

export function markShaurmaItemDeletedFromCartForMain(shaurmaId) {
  markShaurmaItemDeletedFromCart(shaurmaId)
}

export function markShaurmaItemDeletedFromMainInHome(shaurmaId) {
  markShaurmaItemDeletedFromMain(shaurmaId)
}
