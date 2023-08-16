class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.variantId = this.getAttribute("selected-variant")
    this.enableAddCart = this.getAttribute("enable-add-cart") === "true" ? true : false
    this.formAddCart = this.querySelector(".product-add-form")
    this.minicar = document.querySelector("mini-cart")
  }

  static get observedAttributes() {
    return ['selected-variant'];
  }

  connectedCallback() {
    if (this.enableAddCart) {
      this.addToCart();
    }
  }

  attributeChangedCallback(name, prevValue, newValue) {
    if (name === 'selected-variant') {
      if (prevValue === null) return

      this.variantId = newValue;
      console.log("Nueva variante seleccionada con id " + newValue);
      this.changeVariantPrice();
      this.changeImageVariant();
    }
  }

  changeVariantPrice() {
    console.log("TODO cambio de precio")
  }

  changeImageVariant() {
    console.log("TODO cambio de imagen")
  }

  addToCart() {
    this.formAddCart.addEventListener("submit", async (e)=> {
      e.preventDefault();
      this.updateMinicart();
    })
  }

  updateMinicart() {
    this.minicar.setAttribute("selected-variant", this.variantId);
  }
}

customElements.define("product-card", ProductCard);
