class MainProduct extends ProductCard {
  constructor() {
    super()
  }

  connectedCallback() {
    if (this.enableAddCart) {
      this.addToCart();
    }
  }
}

customElements.define("main-product", MainProduct);
