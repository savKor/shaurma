import './style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createRegistrarionContainer } from './registration'
import { registerUser } from './api/fetch-registration'

function renderPageTemplate() {
  const registrationHTML = createRegistrarionContainer()
  document.body.insertAdjacentHTML('afterbegin', registrationHTML)
}

function handleRegistrationResult(result) {
  if (result.success === false) {
    alert(result.errors[0].message)
  } else {
    alert('Поздравляю')
    window.location.href = '/html/login.html'
  }
}

async function onRegisterClick() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const result = await registerUser({ username, password })
  handleRegistrationResult(result)
}

function render() {
  renderPageTemplate()
  document.getElementById('register').addEventListener('click', onRegisterClick)
}

render()
