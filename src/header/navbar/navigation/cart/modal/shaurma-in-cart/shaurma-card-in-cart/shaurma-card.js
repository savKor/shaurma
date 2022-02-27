export function createShaurmaCardInCart(
  idOfCard,
  nameOfShaurma,
  costOfShaurma,
  idOfShaurma,
) {
  return /* html */ `

    <div id="${idOfCard}"class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
          <div class="col-md-4">
              <img src="../images/Depositphotos_73527551_l-2015-pic905-895x505-54479.jpg" id="image-shaurma-in-cart" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
              <div class="card-body">
                    <h5 class="card-title">${nameOfShaurma}</h5>
                    <p class="card-text">Цена: ${costOfShaurma}</p>
                    <button type="button" class="delete-from-cart btn btn-primary" id="${idOfShaurma}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                  </button>
              </div>
          </div>
      </div>
  </div>
`
}
