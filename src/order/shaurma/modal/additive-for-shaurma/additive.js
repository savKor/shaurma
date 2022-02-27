import {
  changeStatusOfAdditiveButton,
  getAddButton,
  getDeleteButton,
} from './button/indexButton'

function createListOfCards(additiveList, shaurmaId, fullInfoAboutOrder) {
  const listOfCards = []

  for (let i = 0; i < additiveList.length; i++) {
    const nameOfAdditive = additiveList[i].name
    const costOfAdditive = additiveList[i].cost
    const imageOfAdditive = additiveList[i].image
    const idOfCard = /* html */ `modal-card_${additiveList[i]._id}`
    const idOfAdditive = /* html */ `button-addition_${additiveList[i]._id}`
    const buttonAdditive = changeStatusOfAdditiveButton(
      fullInfoAboutOrder,
      shaurmaId,
      idOfAdditive,
    )
    const cardsOfAdditive = /* html */ `
    
          <div id="${idOfCard}"class="user-order card mb-3">
            <div class="user-additive row g-0">
                <div id="image-container" class="col-md-4">
                    <img src="${imageOfAdditive}" id="image-additive-in-order" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${nameOfAdditive}</h5>
                      <p class="card-text">Цена: ${costOfAdditive}</p>
                      <div>
                        ${buttonAdditive}
                      </div>
                    </div>
                </div>
            </div>
          </div>
         `
    listOfCards[i] = cardsOfAdditive
  }

  return listOfCards
}

export function getAdditive(additiveList, shaurmaId, fullInfoAboutOrder) {
  const shaurmaCards = createListOfCards(
    additiveList,
    shaurmaId,
    fullInfoAboutOrder,
  )
  const oneStringListOfCards = shaurmaCards.join('')
  return oneStringListOfCards
}

export function enableAddOrDeleteAdditive(onHandleButtonAdditive) {
  document
    .getElementById('additives-to-choose-from')
    .addEventListener('click', (event) => {
      onToggleAdditiveClick(event, onHandleButtonAdditive)
    })
}

function onToggleAdditiveClick(event, onHandleButtonAdditive) {
  let eventName
  const divElement = event.target.closest('.add-or-delete-additive')
  if (!divElement) {
    return
  }
  const additiveId = divElement.id
  const splitId = additiveId.split('_')
  if (divElement.getAttribute('eventName') === 'add') {
    eventName = 'add'
    divElement.parentElement.innerHTML = getDeleteButton(
      `button-addition_${splitId[1]}`,
    )
  } else {
    eventName = 'delete'
    divElement.parentElement.innerHTML = getAddButton(
      `button-addition_${splitId[1]}`,
    )
  }
  onHandleButtonAdditive(splitId[1], eventName)
}
