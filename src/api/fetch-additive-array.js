import { API_URL } from './config'
import { getHeader } from './header'

export async function fetchAdditive() {
  const head = getHeader()
  const response = await fetch(`${API_URL}additive`, {
    method: 'GET',
    headers: head,
  })

  const commits = await response.json()

  const result = await commits
  console.log(result)
  return result
}
