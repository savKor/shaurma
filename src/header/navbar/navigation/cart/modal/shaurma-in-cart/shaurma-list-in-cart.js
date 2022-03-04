import { storage } from '../../../../../../storage/index'
import { createShaurmaCardInCart } from './shaurma-card-in-cart/shaurma-card'

function createListOfCards(shaurmaList) {
  const listOfCards = []

  for (let i = 0; i < shaurmaList.length; i++) {
    if (shaurmaList[i].inCart === true) {
      const nameOfShaurma = shaurmaList[i].name
      const costOfShaurma = shaurmaList[i].cost
      const idOfCard = /* html */ `modal-card_${shaurmaList[i]._id}`
      const idOfShaurma = /* html */ `shaurma-list_${shaurmaList[i]._id}`
      const cardsOfShaurma = createShaurmaCardInCart(
        idOfCard,
        nameOfShaurma,
        costOfShaurma,
        idOfShaurma,
      )
      listOfCards[i] = cardsOfShaurma
    }
  }

  return listOfCards
}

export function getShaurma(shaurmaList) {
  const shaurmaCards = createListOfCards(shaurmaList)
  const oneStringListOfCards = shaurmaCards.join('')
  return oneStringListOfCards
}

export function enableShaurmaListInCart(onAddInCart) {
  if (storage.user.loggedIn) {
    document.getElementById('cartModal').addEventListener('click', (event) => {
      onDeleteClick(event, onAddInCart)
    })
  }
}

export function addNewAddedShaurmaInCart(shaurmaId, shaurmaList) {
  let cardOfShaurma = []
  const newAddedShaurma = shaurmaList.filter((item) => item._id === shaurmaId)

  const nameOfShaurma = newAddedShaurma[0].name
  const costOfShaurma = newAddedShaurma[0].cost
  const idOfCard = /* html */ `modal-card_${newAddedShaurma[0]._id}`
  const idOfShaurma = /* html */ `shaurma-list_${newAddedShaurma[0]._id}`
  cardOfShaurma = createShaurmaCardInCart(
    idOfCard,
    nameOfShaurma,
    costOfShaurma,
    idOfShaurma,
  )

  return cardOfShaurma
}

export function markShaurmaItemDeletedFromModalCart(shaurmaId) {
  const modalCard = document.getElementById(`modal-card_${shaurmaId}`)
  modalCard.remove()
}

async function onDeleteClick(event, onDeleteInCart) {
  if (event.target.closest('.delete-from-cart')) {
    const shaurmaId = event.target.closest('.delete-from-cart').id
    // delete_
    const splitId = shaurmaId.split('_')
    onDeleteInCart(splitId[1])
  }
}
