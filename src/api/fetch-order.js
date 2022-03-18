import { API_URL } from './config'
import { getHeader } from './header'

export async function addOrderToDatabase(data) {
  const rawResponse = await fetch(`${API_URL}order`, {
    method: 'POST',
    headers: getHeader(),
    body: JSON.stringify(data),
  })
  const payload = await rawResponse.json()

  console.log(payload)

  return payload
}
