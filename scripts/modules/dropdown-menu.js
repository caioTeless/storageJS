class DropdownnMenu {
  constructor() {
    this.dropdownMenu = document.querySelectorAll("[data-dropdown]");
    this.dropdownMenu.forEach((menu) => {
      menu.addEventListener("click", this.handleClickMenu.bind(this));
    });
  }

  handleClickMenu(event) {
    event.preventDefault();
    const menu = event.currentTarget;
    menu.classList.add("active");
    this.handleOutsideClickMenu(menu, ["touchstart", "click"], () => {
      menu.classList.remove("active");
    });
  }

  handleOutsideClickMenu(element, events, callback) {
    const html = document.documentElement;
    const outside = "data-outside";

    if (!element.hasAttribute(outside)) {
      events.forEach((evt) => {
        html.addEventListener(evt, handleClick);
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

const menu = new DropdownnMenu();
