import './style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createLoginContainer } from './login/index'
import { loginUser } from './api/fetch-login'

function renderPageTemplate() {
  const loginHTML = createLoginContainer()
  document.body.insertAdjacentHTML('afterbegin', loginHTML)
}

function handleLoginResult(result) {
  if (result.success === false) {
    alert(result.errors[0].message)
  } else {
    const dataKey = result.data
    localStorage.setItem('token', dataKey.token)
    window.location.href = '/html/home.html'
  }
}

async function onLoginClick() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const result = await loginUser({ username, password })

  handleLoginResult(result)
}

function render() {
  renderPageTemplate()
  document.getElementById('login').addEventListener('click', onLoginClick)
}

render()
