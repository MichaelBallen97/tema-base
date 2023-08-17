class Tabs extends HTMLElement {
  constructor () {
    super()
    this.queryTitles = this.getAttribute("title-query")
    this.queryContents = this.getAttribute("content-query")
    this.parentTitles = this.querySelector(".tabs-titles")
    this.parentContents = this.querySelector(".tabs-content")
    this.titles = []
    this.contents = []
  }

  connectedCallback () {
    this.queryTitles === "" 
      ? this.titles = this.querySelectorAll(".tabs-titles > *") 
      : this.titles = this.parentTitles.querySelectorAll(`.${this.queryTitles}`)

    this.queryContents === "" 
      ? this.contents = this.querySelectorAll(".tabs-content > *") 
      : this.contents = this.parentContents.querySelectorAll(`.${this.queryContents}`)

    this.tabs();
  }

  tabs() {
    this.validateActiveClass();
    this.activateTabs();
  }

  validateActiveClass() {
    if(!this.titles[0].classList.contains("active")) {
      this.titles[0].classList.add("active");
    }

    if(!this.contents[0].classList.contains("active")) {
      this.contents[0].classList.add("active");
    }
  }

  activateTabs() {
    this.titles.forEach((title, index) => {
      title.addEventListener("click", ()=> {
        this.titles.forEach(title => {
          title.classList.remove("active");
        })

        title.classList.add("active");

        this.contents.forEach(content => {
          content.classList.remove("active");
        })

        this.contents[index].classList.add("active");
      })
    });
  }
}

customElements.define("tabs-content", Tabs);
