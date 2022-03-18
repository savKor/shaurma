import { storage } from '../../storage/index'
import {
  changeStatusOfButton,
  getDisabledButton,
  getEnableButton,
} from './button/button'

function createListOfCards(shaurmaList) {
  const listOfCards = []

  for (let i = 0; i < shaurmaList.length; i++) {
    const nameOfShaurma = shaurmaList[i].name
    const costOfShaurma = shaurmaList[i].cost
    const idOfShaurma = /* html */ `button-add_${shaurmaList[i]._id}`
    const idOfCardShaurma = /* html */ `card_${shaurmaList[i]._id}`
    const statusShaurmaInCart = shaurmaList[i].inCart

    const buttonAdd = changeStatusOfButton(statusShaurmaInCart, idOfShaurma)

    const cardsOfShaurma = /* html */ `
            <div class="shaurma-cards" id='${idOfCardShaurma}'>
                <img id="image-shaurma" src="../images/Depositphotos_73527551_l-2015-pic905-895x505-54479.jpg" class="card-img-top" alt="...">
                <div class="card-body bg-secondary text-center">
                    <h5 class="card-title">${nameOfShaurma}</h5> 
                    <div class="row row-cols-1 row-cols-sm-2"> 
                        <h6 class="card-text">${costOfShaurma}rub</h6>
                        <div>
                          ${buttonAdd} 
                        </div>
                    </div>       
                </div>
            </div>
        `
    listOfCards[i] = cardsOfShaurma
  }

  return listOfCards
}

export function enableShaurmaList(onAddInCart, onDeleteInCart) {
  if (storage.user.loggedIn) {
    document.getElementById('main-form').addEventListener('click', (event) => {
      onAddClick(event, onAddInCart)
      onDeleteClick(event, onDeleteInCart)
    })
  }
}

async function onAddClick(event, onAddInCart) {
  if (event.target.closest('.add-in-the-cart')) {
    const shaurmaId = event.target.closest('.add-in-the-cart').id
    // delete_
    const splitId = shaurmaId.split('add_')
    onAddInCart(splitId[1])
  }
}

async function onDeleteClick(event, onDeleteInCart) {
  if (event.target.closest('.delete-from-main')) {
    const shaurmaId = event.target.closest('.delete-from-main').id
    const splitId = shaurmaId.split('_')
    onDeleteInCart(splitId[1])
  }
}

export function markShaurmaItemAddedInCart(shaurmaId) {
  const button = document.getElementById(`button-add_${shaurmaId}`)
  button.parentElement.innerHTML = getDisabledButton(`button-add_${shaurmaId}`)
}

export function markShaurmaItemDeletedFromCart(shaurmaId) {
  const button = document.getElementById(`button-add_${shaurmaId}`)
  button.parentElement.innerHTML = getEnableButton(`button-add_${shaurmaId}`)
}

export function markShaurmaItemDeletedFromMain(shaurmaId) {
  const modalCard = document.getElementById(`card_${shaurmaId}`)
  modalCard.remove()
}

export function getShaurma(shaurmaList) {
  const shaurmaCards = createListOfCards(shaurmaList)
  const oneStringListOfCards = shaurmaCards.join('')
  return oneStringListOfCards
}
