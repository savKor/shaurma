import { parseJwt, userToken, checkUserLoggedIn } from '../api/token'

const loggedIn = checkUserLoggedIn()

const userData = {
  token: userToken,
  username: loggedIn ? parseJwt(userToken).username : '',
  loggedIn,
}

export const storage = {
  user: userData,
}
