import { createCart } from './cart/cart'
import { createSignUpButton } from './sing-up/sign-up'

export function createNavigation() {
  const cartHTML = createCart()
  const singUpButtonHTML = createSignUpButton()

  const navigationHTML = /* html */ `
        <div class="col-4" id="option-elements">
            ${cartHTML}
            ${singUpButtonHTML}
        </div>
    `
  return navigationHTML
}
