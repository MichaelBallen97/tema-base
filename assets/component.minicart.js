class Minicart extends HTMLElement {
  constructor() {
    super();
    this.typeCart = this.getAttribute("cart-type")
    this.delay = this.getAttribute("delay");
    this.selectedVariant = this.getAttribute("selected-variant");
  }

  static get observedAttributes() {
    return ['selected-variant'];
  }

  attributeChangedCallback(name, prevValue, newValue) {
    if (name === 'selected-variant') {
      this.selectedVariant = newValue;
      this.addItem();
    }
  }

  async addItem() {
    const data = await this.addCart(this.selectedVariant, 1, "header");
    const {header} = data.sections;
    const {items} = data
    this.updateCartCounter(header)

    if (this.typeCart === 'notification') {
      this.updateNotificationCart(items);
    }
  }

  async updateNotificationCart (items) {
    const notificationsParent = document.querySelector(".cart-notifications");
    const item = items[0];
    const delayRemove = parseInt(this.delay)*1000;

    const notificationTemplate = `
      <section class="cart-notification">
        <span class="cart-notification--close">
          <svg width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21.32L21 3.32001" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 3.32001L21 21.32" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <div class="cart-notification--info">
          <h4> ${item.title} </h4>
          <span>x ${item.quantity}</span>
        </div>

        <div class="cart-notification--price">
          <span> ${item.price} </span>
        </div>

        <a href="/cart">View cart</a>
      </section>
    `

    notificationsParent.insertAdjacentHTML("beforeend", notificationTemplate);
    
    const notifications = this.querySelectorAll(`.cart-notification`);
    notifications.forEach(notification => {
      notification.querySelector(".cart-notification--close").addEventListener("click", ()=> {
        notification.remove();
      })

      setTimeout(() => {
        notification.remove();
      }, delayRemove);

    })
  }

  async getCart() {
    try {
      const response = await fetch("/cart.js");
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`Error al Actualizar el carrito: ${error.message}`)
    }
  }

  async addCart(variantId, quantity, section = undefined) {
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

  updateCartCounter(htmlString) {
    const parser = new DOMParser
    const newHTML = parser.parseFromString(htmlString, 'text/html');

    const cartCurrentCounter = document.querySelector("main-menu .item-cart--counter");
    const cartNewCounter = newHTML.querySelector("main-menu .item-cart--counter");

    cartCurrentCounter.innerText = cartNewCounter.innerText;
  }
}

customElements.define("mini-cart", Minicart);