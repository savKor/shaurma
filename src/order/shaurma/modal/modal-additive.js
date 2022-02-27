import {
  enableAddOrDeleteAdditive,
  getAdditive,
} from './additive-for-shaurma/additive'

export function createDefoltModal() {
  const modalHTML = /* html */ `
            <div class="modal fade" id="additiveModal" tabindex="-1" aria-labelledby="additiveModalLabel" aria-hidden="true">
              <div id="modal-dialog" class="modal-dialog modal-dialog-scrollable">
                <div id="modal-content" class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Добавляй своё *****</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div id="additives-to-choose-from" class="modal-body">
                  </div>
                  <div class="modal-footer">
                  </div>
                </div>
              </div>
            </div>
        `
  return modalHTML
}

export function enableAdditiveButtonModal(onHandleButtonAdditive) {
  enableAddOrDeleteAdditive(onHandleButtonAdditive)
}

export function insertAndCreateAdditiveForModal(
  additiveList,
  shaurmaId,
  fullInfoAboutOrder,
) {
  const additive = getAdditive(additiveList, shaurmaId, fullInfoAboutOrder)
  document.getElementById(
    'additives-to-choose-from',
  ).innerHTML = /* html */ `${additive}`
}
