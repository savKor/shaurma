import { API_URL } from './config'

export async function loginUser(data) {
  const rawResponse = await fetch(`${API_URL}user/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const payload = await rawResponse.json()

  return payload
}
