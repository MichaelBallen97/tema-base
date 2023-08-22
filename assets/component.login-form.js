class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.showRecoveryButton = this.querySelector('.password-recovery');
    this.showLoginButton = this.querySelector('.show-login-form');
  }

  connectedCallback() {
    this.showRecoveryButton.addEventListener("click", ()=> {
      this.setAttribute("mode", "recovery")
    })

    this.showLoginButton.addEventListener("click", ()=> {
      this.setAttribute("mode", "login")
    })
  }
}

customElements.define('login-form', LoginForm);
