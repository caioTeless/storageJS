class MenuMobile {
  constructor() {
    this.menuButton = document.querySelector('[data-menu="button"]');
    this.menuList = document.querySelector('[data-menu="list"]');
    this.events = ["click", "touchstart"];

    this.openMenu = this.openMenu.bind(this);

    this.events.forEach((evt) => {
      this.menuButton.addEventListener(evt, this.openMenu);
    });
  }

  openMenu(event) {
    this.menuList.classList.add("active");
    this.menuButton.classList.add("active");
    this.handleOutsideClickMenu(this.menuList, this.events, () => {
      this.menuList.classList.remove("active");
      this.menuButton.classList.remove("active");
    });
  }

  handleOutsideClickMenu(element, events, callback) {
    const html = document.documentElement;
    const outside = "data-outside";

    if (!element.hasAttribute(outside)) {
      events.forEach((evt) => {
        setTimeout(() => {
          html.addEventListener(evt, handleClick);
        });
      });
      element.setAttribute(outside, "");
    }

    function handleClick(event) {
      if (!element.contains(event.target)) {
        element.removeAttribute(outside);
        events.forEach((evt) => {
          html.removeEventListener(evt, handleClick);
        });
        callback();
      }
    }
  }
}

const menuMobile = new MenuMobile();
