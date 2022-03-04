import { createNavigator } from './navigator/navigator'
import { createTrademark } from './trademark/trademark'

export function createFooter() {
  const getNavigator = createNavigator()
  const getTrademark = createTrademark()
  const footerHTML = /* html */ `
        <footer>
            ${getNavigator}
            ${getTrademark}
        </footer>
    `
  return footerHTML
}
