class VariantsSelector extends HTMLElement {
  constructor() {
    super();

    this.productCardParent = this.closest("product-card");
    this.selectors = this.querySelectorAll(".variant-option")
    this.variants = JSON.parse(this.querySelector('[name="variants"]').value)
    this.options = []
    this.variantTitle = ""
    this.variantId = ""
  }

  connectedCallback () {
    this.listenVariantsSelectors();
  }

  listenVariantsSelectors() {
    this.selectors.forEach(selector => {
      selector.addEventListener("change", ()=> {
        this.variantTitle = this.getVariantTitle();
        this.variantId = this.getVariantId();
        this.productCardParent.setAttribute("selected-variant", this.variantId);
      })
    });
  }

  getVariantTitle () {
    this.options = Array.from(this.selectors).map(option => option.value)

    return this.options.join('/');
  }

  getVariantId () {
    return this.variants.filter(variant => this.variantTitle === variant.title)[0].id;
  }

  addToCart() {

  }
}

customElements.define("variants-selector", VariantsSelector);