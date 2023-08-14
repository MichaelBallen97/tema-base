class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.variantId = this.getAttribute("selected-variant")
    this.enableAddCart = this.getAttribute("enable-add-cart") === "true" ? true : false
    this.formAddCart = this.querySelector("product-add-form")
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
    this.formAddCart.addEventListener("submit", (e)=> {
      e.preventDefault();
      this.getDataCart(this.variantId, 1)

    })
  }

  getDataCart(variantId, quantity, section = undefined) {
    let formData = {
      items:[
        {
          id: variantId,
          quantity: quantity
        }
      ]
    }
  }
}

customElements.define("product-card", ProductCard);