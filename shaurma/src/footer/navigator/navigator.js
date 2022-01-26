export function createNavigator() {
  const navigatorHtml = /*html*/ `
        <ul class="nav border-bottom">
            <li class="nav-item">
                <a href="#" class="nav-link text-muted">Home</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-muted">Features</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-muted">Pricing</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-muted">FAQs</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-muted">About</a>
            </li>
        </ul>
    `
  return navigatorHtml
}
