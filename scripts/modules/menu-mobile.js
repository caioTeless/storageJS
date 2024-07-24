const menuButton = document.querySelector('[data-menu="button"]');
const menuList = document.querySelector('[data-menu="list"]');
const events = ["click", "touchstart"];

function openMenu(event) {
  menuList.classList.add("active");
  menuButton.classList.add("active");
  handleOutsideClickMenu(menuList, events, () => {
    menuList.classList.remove("active");
    menuButton.classList.remove("active");
  });
}

function handleOutsideClickMenu(element, events, callback) {
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

events.forEach((evt) => {
  menuButton.addEventListener(evt, openMenu);
});
