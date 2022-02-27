export function createNick(username) {
  const nickHTML = /* html */ `
      <a class="navbar-brand" href="">
        <strong>${username}</strong>
      </a>
        `
  return nickHTML
}
