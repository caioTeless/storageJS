import clickOutside from "./clickOutside.js";

export default class DropdownnMenu {
  constructor(dropdownMenu, events) {
    this.dropdownMenu = document.querySelectorAll(dropdownMenu);

    if (events === undefined) this.events = ["touchstart", "click"];
    else this.events = events;

    this.active = "active";
    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  activeDropdownMenu(event) {
    const menu = event.currentTarget;
    menu.classList.add(this.active);
    clickOutside(menu, this.events, () => {
      menu.classList.remove(this.active);
    });
  }

  addDropdownEvent() {
    this.dropdownMenu.forEach((menu) => {
      this.events.forEach((evt) => {
        menu.addEventListener(evt, this.activeDropdownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenu.length) {
      this.addDropdownEvent();
    }
    return this;
  }
}
