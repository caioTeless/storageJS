import clickOutside from "./clickOutside.js";

export default class MenuMobile {
  constructor(menuButton, menuList, events) {
    this.menuButton = document.querySelector(menuButton);
    this.menuList = document.querySelector(menuList);
    this.active = "active";

    if (events === undefined) this.events = ["click", "touchstart"];
    else this.events = events;

    this.openMenu = this.openMenu.bind(this);
  }

  openMenu(event) {
    this.menuList.classList.add(this.active);
    this.menuButton.classList.add(this.active);
    clickOutside(this.menuList, this.events, () => {
      this.menuList.classList.remove(this.active);
      this.menuButton.classList.remove(this.active);
    });
  }

  addMenuMobileEvents() {
    this.events.forEach((evt) =>
      this.menuButton.addEventListener(evt, this.openMenu)
    );
  }

  init() {
    if (this.menuButton && this.menuList) {
      this.addMenuMobileEvents();
    }
    return this;
  }
}
