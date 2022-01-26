import { getRandomNumberForTheCoast } from './coast-generator/coast-generator.js'
import { fetchShaurma } from '../../api/fetchArray'

export const loadShaurma = async () => {
  let shaurmaList = await fetchShaurma()

  console.log(shaurmaList)

  let shaurmaCards = createListOfCards(shaurmaList)

  let oneStringListOfCards = shaurmaCards.join('')

  return oneStringListOfCards
}

function createListOfCards(shaurmaList) {
  const minCoast = 100
  const maxCoast = 330
  let listOfCards = []

  for (let i = 0; i < shaurmaList.length; i++) {
    let nameOfShaurma = shaurmaList[i]
    let randomNumber = getRandomNumberForTheCoast(minCoast, maxCoast)

    let cardsOfShaurma = /*html*/ `
            <div class="shaurma-cards">
                <img src="../images/Depositphotos_73527551_l-2015-pic905-895x505-54479.jpg" class="card-img-top" alt="...">
                <div class="card-body bg-secondary text-center">
                    <h5 class="card-title">${nameOfShaurma}</h5> 
                    <div class="row row-cols-1 row-cols-sm-2"> 
                        <h6 class="card-text">${randomNumber}rub</h6>    
                        <button type="button" class="add-in-the-cart btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                            </svg>
                        </button>
                    </div>       
                </div>
            </div>
        `

    listOfCards[i] = cardsOfShaurma
  }

  return listOfCards
}
