class PopUp extends HTMLElement {
  constructor () {
    super()
    this.closeIcon = this.querySelector(".popup-icon-close");
    this.automatic = this.hasAttribute("time");
  }

  connectedCallback () {
    this.closeIcon.addEventListener("click", ()=> {
      this.closeModal();
    })

    if (this.automatic) {
      this.autoOpenModal();
    }
  }

  openModal() {
    this.setAttribute("open", "true");
  }

  closeModal() {
    this.setAttribute("open", "false");
  }

  autoOpenModal() {
    const time = +this.getAttribute("time") * 1000;

    setTimeout(() => {
      this.openModal();
    }, time);
  }
}

customElements.define("pop-up", PopUp);