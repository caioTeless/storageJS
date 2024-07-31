import DropdownnMenu from "./modules/dropdownMenu.js";
import MenuMobile from "./modules/menuMobile.js";
import NavMenuItems from "./modules/navMenuItems.js";

const app = new Vue({
  el: "#app",
  mounted() {
    new DropdownnMenu("[data-dropdown]").init();
    new MenuMobile('[data-menu="button"]', '[data-menu="list"]').init();
    new NavMenuItems(".nav-center .nav-link").init();
  },
});
