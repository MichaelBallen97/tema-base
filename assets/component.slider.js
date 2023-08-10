class Slider extends HTMLElement {
  constructor () {
    super()

    this.loop = this.getAttribute("loop") === 'true' ? true : false;
    this.direction = this.getAttribute("direction");
    this.slidersPerPage = this.getAttribute("sliders-per-page") === 'auto' ? 'auto' : parseInt(this.getAttribute("sliders-per-page"));
    this.autoplay = this
    this.delay
  }

  connectedCallback () {
    const swiper = new Swiper(this, {
      direction: this.direction,
      loop: this.loop,
      slidesPerView: this.slidersPerPage,
    
      // If we need pagination
      pagination: {
        el: this.querySelector('.swiper-pagination'),
      },
    
      // Navigation arrows
      navigation: {
        nextEl: this.querySelector('.swiper-button-next'),
        prevEl: this.querySelector('.swiper-button-prev'),
      }
    });
  }
}

customElements.define("carousel-slider", Slider);