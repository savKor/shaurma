import { createNavbar } from "./navbar/navbar.js";


export function createHeader() {
    const navbarHTML = createNavbar()

    const headerHTML= /*html*/`
        <header> 
            ${navbarHTML} 
        </header>
    `
    return headerHTML
}