import {
  createDefoltModal,
  enableAdditiveButtonModal,
  insertAndCreateAdditiveForModal,
} from './modal/modal-additive'

function createListOfCards(shaurmaList) {
  const listOfCards = []
  for (let i = 0; i < shaurmaList.length; i++) {
    if (shaurmaList[i].inCart === true) {
      const nameOfShaurma = shaurmaList[i].name
      const costOfShaurma = shaurmaList[i].cost
      const idOfButtonDeleteShaurma = `shaurma-list_${shaurmaList[i]._id}`
      const idOfCard = `shaurma-card_${shaurmaList[i]._id}`
      const idOfModalButton = `modal_${shaurmaList[i]._id}`
      const defoltModal = createDefoltModal()
      const cardsOfShaurma = /* html */ `
  
        <div id="${idOfCard}"class="user-order card mb-3">
            <div class="user-shaurma row g-0">
                <div id="image-container" class="col-md-4">
                    <img src="../images/Depositphotos_73527551_l-2015-pic905-895x505-54479.jpg" id="image-shaurma-in-order" class="img-fluid rounded-start" alt="...">
                </div>
                <div id="info-panel" class="col-md-8">
                    <div class="info-of-shaurma">
                        <button type="button" class="open-modal btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#additiveModal" id ='${idOfModalButton}'>Добавить добавки</button>
                        <div id="additive-modal">
                         ${defoltModal}
                        </div>
                        <h5 id="name-of-shaurma" class="card-title">${nameOfShaurma}</h5>
                        <p id="cost-for-shaurma"class="card-text">Цена: ${costOfShaurma}</p>
                        <button type="button" class="delete-from-cart btn btn-primary" id="${idOfButtonDeleteShaurma}">
                          Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
       `
      listOfCards[i] = cardsOfShaurma
    }
  }
  return listOfCards
}

export function createAdditivesForModal(
  additiveList,
  shaurmaId,
  fullInfoAboutOrder,
) {
  insertAndCreateAdditiveForModal(additiveList, shaurmaId, fullInfoAboutOrder)
}

export function enableAdditiveAddOrDeleteOnShaurmaList(onHandleButtonAdditive) {
  enableAdditiveButtonModal(onHandleButtonAdditive)
}

export function enableEventOpenModalOfShaurma(openAdditiveModal) {
  document.getElementById('main-form').addEventListener('click', (event) => {
    getIdOfShaurma(event, openAdditiveModal)
  })
}

export function getShaurma(shaurmaList, additiveList) {
  const shaurmaCards = createListOfCards(shaurmaList, additiveList)
  const oneStringListOfCards = shaurmaCards.join('')
  return oneStringListOfCards
}

async function getIdOfShaurma(event, openAdditiveModal) {
  if (event.target.closest('.open-modal')) {
    const shaurmaId = event.target.closest('.open-modal').id
    const splitId = shaurmaId.split('_')
    openAdditiveModal(splitId[1])
  }
}

export function enableDeleteShaurma(onDeleteInCar) {
  document.getElementById('main-form').addEventListener('click', (event) => {
    onDeleteClick(event, onDeleteInCar)
  })
}

async function onDeleteClick(event, onDeleteInCart) {
  if (event.target.closest('.delete-from-cart')) {
    const shaurmaId = event.target.closest('.delete-from-cart').id
    debugger
    const splitId = shaurmaId.split('_')
    onDeleteInCart(splitId[1])
  }
}

export function markShaurmaItemDeletedFromOrder(shaurmaId) {
  const modalCard = document.getElementById(`shaurma-card_${shaurmaId}`)
  modalCard.remove()
}

/*
1.Ввести переменную в которую будут записываться данные об id шаурмы
3.Записывать в неё id при открытие модала и перезаписывать на пустое значение при закрытие
    
    event.target.setAttribute('eventName', 'add')
4.При добавление добавок нужно записывать id добавок вместе с id шаурмы
*/
