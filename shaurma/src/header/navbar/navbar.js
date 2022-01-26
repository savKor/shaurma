import { createLogo } from "./logo/logo.js";
import { createNavigation } from "./navigation/navigation.js";



export function createNavbar() {
    const getLogo = createLogo()
    const getNavigation = createNavigation()

    const navbarHTML = /*html*/`
        <div class ="navbar navbar-dark bg-dark">
            <div class="container">
                ${getLogo}
                ${getNavigation}
            </div>
        </div>
    `
    return navbarHTML
}