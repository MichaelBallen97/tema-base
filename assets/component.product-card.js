class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.variantId = this.getAttribute("selected-variant")
    this.enableAddCart = this.getAttribute("enable-add-cart") === "true" ? true : false
    this.formAddCart = this.querySelector(".product-add-form")
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
    this.formAddCart.addEventListener("submit", (e)=> {
      e.preventDefault();
      this.getDataCart(this.variantId, 1);
    })
  }

  async getDataCart(variantId, quantity, section = undefined) {
    let formData = {
      items:[
        {
          id: variantId,
          quantity: quantity
        }
      ]
    }

    if (section) {
      formData.sections = section;
    }

    try {
      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`Error al agregar al carrito: ${error.message}`)
    }
  }

  updateCartCounter() {
    const cartCounter = document.querySelector("main-menu .item-cart--counter");
  }
}

customElements.define("product-card", ProductCard);
