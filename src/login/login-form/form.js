export function createLoginForm() {
  const mainHTML = /* html */ `
              <form id="loginForm">
                  <div class="form-outline mb-4">
                      <input type="text" id="username" class="form-control form-control-lg" />
                      <label class="form-label" for="username">Your Name</label>
                  </div>
  
                  <div class="form-outline mb-4">
                      <input type="password" id="password" class="form-control form-control-lg" />
                      <label class="form-label" for="password">Password</label>
                  </div>
                      
                  <div class="d-flex justify-content-center">
                      <button id="login" type="button" class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                  </div>
              </form>
      `
  return mainHTML
}
