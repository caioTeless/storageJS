export default function clickOutside(element, events, callback) {
  const html = document.documentElement;
  const outside = "data-outside";

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach((evt) => {
        html.removeEventListener(evt, handleOutsideClick);
      });
      callback();
    }
  }

  if (!element.hasAttribute(outside)) {
    events.forEach((evt) => {
      setTimeout(() => html.addEventListener(evt, handleOutsideClick));
    });
    element.setAttribute(outside, "");
  }
}
