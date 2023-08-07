class MainMenu extends HTMLElement {
  constructor () {
    super()

    this.hamburguer_menu = this.querySelector(`#${this.getAttribute("id-hamburguer")}`)
  }

  static get observedAttributes() {
    return ['open'];
  }

  connectedCallback () {
    this.hamburguer_menu.addEventListener("click", ()=> {
      this.getAttribute("open") === "false" ?  this.setAttribute("open", "true") : this.setAttribute("open", "false")
    })
  }
}

customElements.define("main-menu", MainMenu);