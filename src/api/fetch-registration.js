import { API_URL } from './config'

export async function registerUser(data) {
  const rawResponse = await fetch(`${API_URL}user/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const payload = await rawResponse.json()

  console.log(payload)

  return payload
}
