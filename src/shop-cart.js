import './style.css'

import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import { createHeader } from './header'

import { createFooter } from './footer'

import { createMain } from './home-content'

const headerHTML = createHeader()
const footerHTML = createFooter()
const mainHTML = createMain()

document.body.insertAdjacentHTML('afterbegin', footerHTML)
document.body.insertAdjacentHTML('afterbegin', headerHTML)
