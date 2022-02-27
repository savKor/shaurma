import { userToken } from './token'

export function getHeader() {
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (userToken !== null) {
    header['x-access-token'] = userToken
  }
  return header
}
