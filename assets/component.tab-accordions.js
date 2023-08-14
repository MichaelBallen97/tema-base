class Tabs extends HTMLElement {
  constructor () {
    super()
  }

  connectedCallback () {

  }
}

class Accordion extends HTMLElement {
  constructor () {
    super()
  }

  connectedCallback () {

  }
}

customElements.define("accordion-content", Accordion);
customElements.define("tabs-content", Tabs);