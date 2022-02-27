import { API_URL } from './config'
import { getHeader } from './header'

export async function putShaurmaInUserCart(data) {
  const rawResponse = await fetch(`${API_URL}user/cart-list`, {
    method: 'POST',
    headers: getHeader(),
    body: JSON.stringify(data),
  })

  const payload = await rawResponse.json()

  console.log(payload)

  return payload
}

export async function deleteShaurmaInUserCart(data) {
  const rawResponse = await fetch(`${API_URL}user/cart-list/deleted`, {
    method: 'POST',
    headers: getHeader(),
    body: JSON.stringify(data),
  })

  const payload = await rawResponse.json()

  console.log(payload)

  return payload
}
