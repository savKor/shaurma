import './style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createHeader } from './header'
import { createFooter } from './footer'
import { createMain } from './home-content'
import { loadShaurma } from './home-content/list/shaurma-list'

function renderPageTemplate() {
  const headerHTML = createHeader()
  const homeContentHTML = createMain()
  const footerHTML = createFooter()

  document.body.insertAdjacentHTML('beforebegin', headerHTML)
  document.body.insertAdjacentHTML('beforebegin', homeContentHTML)
  document.body.insertAdjacentHTML('beforebegin', footerHTML)
}
async function renderShaurma() {
  const cardListHTML = await loadShaurma()
  document
    .getElementById('card-list')
    .insertAdjacentHTML('afterbegin', cardListHTML)
}

function render() {
  renderPageTemplate()
  renderShaurma()
}
render()
