export default class NavMenuItems {
  constructor(navLinks) {
    this.links = document.querySelectorAll(navLinks);
    this.activeMenu = "active-menu";
    this.events = ["touchstart", "click"];
  }

  controlLinksNavbar() {
    this.links.forEach((link) => {
      this.events.forEach((evt) => {
        link.addEventListener(evt, this.setEventClick.bind(this));
      });
    });
  }

  setEventClick(event) {
    event.preventDefault();
    const menuItem = event.currentTarget;

    this.links.forEach((link) => {
      link.classList.remove(this.activeMenu);
      this.events.forEach((evt) => {
        link.removeEventListener(evt, this.setEventClick);
      });
    });

    menuItem.classList.add(this.activeMenu);
  }

  init() {
    if (this.links.length) {
      this.controlLinksNavbar();
    }
    return this;
  }
}
