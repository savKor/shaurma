import { storage } from '../storage'
import {
  enableEventOpenModalOfShaurma,
  enableAdditiveAddOrDeleteOnShaurmaList,
  getShaurma,
  createAdditivesForModal,
  enableDeleteShaurma,
  markShaurmaItemDeletedFromOrder,
} from './shaurma/user-shaurma-list'

const fullInfoAboutOrderedShaurma = [] // массив в котором хранятся все данные для составления заказа

export function createOrderForm(shaurmaList) {
  const listOfShaurma = getShaurma(shaurmaList)
  const mainHTML = /* html */ `
        <main id="main-form">
            <div class="container">
              <ul id="card-list-of-order" class="g-3">
                ${listOfShaurma}
              </ul>
            </div>
            <div id='map-content'>
              <div id="map"></div>
            </div>
            <div class="d-grid gap-2">
              <button id="order" class="btn btn-primary" type="button" >Оформить заказ</button>
            </div>
        </main>
      `
  return mainHTML
}

export function enableMainWithModal(openAdditiveModal) {
  enableEventOpenModalOfShaurma(openAdditiveModal)
}

export function markDeleteShaurmaFromOrderList(shaurmaId) {
  markShaurmaItemDeletedFromOrder(shaurmaId)
}

export function handleAdditiveButtonsAfterOpenModal(onHandleButtonAdditive) {
  enableAdditiveAddOrDeleteOnShaurmaList(onHandleButtonAdditive)
}

export function markThatModalWasOpen(additiveList, shaurmaId) {
  createAdditivesForModal(additiveList, shaurmaId, fullInfoAboutOrderedShaurma)
}

export function addShaurmanInArray(shaurmaList) {
  let shaurmaObject
  for (let i = 0; i < shaurmaList.length; i++) {
    if (shaurmaList[i].inCart === true) {
      shaurmaObject = {
        // объект
        shaurmaId: shaurmaList[i]._id,
        additiveIdList: [],
      }
      fullInfoAboutOrderedShaurma.push(shaurmaObject)
    }
  }
  console.log(fullInfoAboutOrderedShaurma)
}

export function onChangeOrder(additiveId, eventName, shaurmaId) {
  const chosenShaurma = fullInfoAboutOrderedShaurma.find(
    (shaurma) => shaurmaId === shaurma.shaurmaId,
  )
  if (eventName === 'add') {
    chosenShaurma.additiveIdList.push(additiveId)
    console.log(fullInfoAboutOrderedShaurma)
  } else {
    chosenShaurma.additiveIdList = chosenShaurma.additiveIdList.filter(
      (oneOfAdditiveId) => oneOfAdditiveId !== additiveId,
    )
  }
}

export function changeArrayOnDeleteShaurma(shaurmaId) {
  const chosenShaurma = fullInfoAboutOrderedShaurma.find(
    (shaurma) => shaurmaId === shaurma.shaurmaId,
  )
  console.log(chosenShaurma)
}

export function enableDeleteShaurmaForOrder(onDeleteInCar) {
  enableDeleteShaurma(onDeleteInCar)
}

// функции для добавления данных о заказе в базу данных

export function enableOrderYourOrder(onOrderButton) {
  if (storage.user.loggedIn) {
    document.getElementById('order').addEventListener('click', () => {
      onAddClick(onOrderButton)
    })
  }
}

async function onAddClick(onOrderButton) {
  if (fullInfoAboutOrderedShaurma !== []) {
    onOrderButton(fullInfoAboutOrderedShaurma)
  }
}
