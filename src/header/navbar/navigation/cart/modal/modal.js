import {
  getShaurmaCost,
  markCostThatNewShaurmaAddedInCart,
  markCostThatWereDeletedFromCart,
} from './cost-of-shaurma/full-cost-of-shaurma'
import {
  addNewAddedShaurmaInCart,
  enableShaurmaListInCart,
  getShaurma,
  markShaurmaItemDeletedFromModalCart,
} from './shaurma-in-cart/shaurma-list-in-cart'

export function createModal(shaurmaList) {
  const shaurma = getShaurma(shaurmaList)
  const cost = getShaurmaCost(shaurmaList)

  const modalHTML = /* html */ `
          <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div id="modal-dialog" class="modal-dialog modal-dialog-scrollable">
              <div id="modal-content" class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id="cart-with-shaurma" class="modal-body">
                  ${shaurma}
                </div>
                <div class="modal-footer">
                  <strong id ="fullCostOfShaurma">${cost}</strong>
                  <a type="button" class="btn btn-primary" href='./order.html'>Оформить заказ</a>
                </div>
              </div>
            </div>
          </div>
      `
  return modalHTML
}

export function enableModal(onAddInCart) {
  enableShaurmaListInCart(onAddInCart)
}

export function markModalThatFullCostOfShaurmaHasChange(
  shaurmaId,
  shaurmaList,
) {
  markCostThatNewShaurmaAddedInCart(shaurmaId, shaurmaList)
}

export function markShaurmaItemDeletedInCartModal(shaurmaId, shaurmaList) {
  markShaurmaItemDeletedFromModalCart(shaurmaId)
  markCostThatWereDeletedFromCart(shaurmaId, shaurmaList)
}

export function addNewShaurmaInModal(shaurmaId, shaurmaList) {
  const newShaurma = addNewAddedShaurmaInCart(shaurmaId, shaurmaList)
  document
    .getElementById('cart-with-shaurma')
    .insertAdjacentHTML('afterbegin', newShaurma)
}
