class Slider extends HTMLElement {
  constructor () {
    super()

    this.loop = this.getAttribute("loop") === 'true' ? true : false;
    this.direction = this.getAttribute("direction");
    this.slidersPerPageMobile = this.getAttribute("sliders-per-page-mobile") === 'auto' ? 'auto' : parseInt(this.getAttribute("sliders-per-page-mobile"));
    this.slidersPerPageDesktop = this.getAttribute("sliders-per-page") === 'auto' ? 'auto' : parseInt(this.getAttribute("sliders-per-page"));
    this.autoplay = this.getAttribute("autoplay") === 'true' ? true : false;
    this.delay = this.getAttribute("delay") * 1000;
  }

  connectedCallback () {
    this.initSlider();
  }

  initSlider() {
    const swiper = new Swiper(this, {
      slidesPerView: this.slidersPerPageMobile,
      spaceBetween: 10,
      direction: this.direction,
      loop: this.loop,
      autoplay: {
        delay: this.delay,
        disableOnInteraction: false,
      },

      pagination: {
        el: this.querySelector('.swiper-pagination'),
        clickable: true,
      },
    
      navigation: {
        nextEl: this.querySelector('.swiper-button-next'),
        prevEl: this.querySelector('.swiper-button-prev'),
      },

      breakpoints: {
        768: {
          slidesPerView: this.slidersPerPageDesktop,
          spaceBetween: 30,
        }
      }
    });

    swiper.autoplay.stop();

    if(this.autoplay === true) {
      swiper.autoplay.start();
    }
  }
}

customElements.define("carousel-slider", Slider);
