import { createNavbar } from './navbar/navbar'

export function createHeader() {
  const navbarHTML = createNavbar()

  const headerHTML = /* html */ `
        <header> 
            ${navbarHTML} 
        </header>
    `
  return headerHTML
}
