export function createRegistrarionForm() {
  const mainHTML = /* html */ `
        <form id="registerForm">
            <div class="form-outline mb-4">
                <input type="text" id="username" class="form-control form-control-lg" />
                <label class="form-label" for="username">Your Name</label>
            </div>

            <div class="form-outline mb-4">
                <input type="password" id="password" class="form-control form-control-lg" />
                <label class="form-label" for="password">Password</label>
            </div>
                    
            <div class="d-flex justify-content-center">
                <button id="register" type="button" class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
            </div>
                    
            <p class="text-center text-muted mt-5 mb-0">
                Have already an account? 
                <a href="/html/login.html" class="fw-bold text-body">
                    <u>Login here</u>
                </a>
            </p>
        </form>
    `
  return mainHTML
}
