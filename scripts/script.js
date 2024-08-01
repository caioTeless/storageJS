import DropdownnMenu from "./modules/dropdownMenu.js";
import MenuMobile from "./modules/menuMobile.js";
import NavMenuItems from "./modules/navMenuItems.js";

const app = new Vue({
  el: "#app",
  methods: {
    loadNav() {
      fetch("_navbar.html")
        .then((response) => response.text())
        .then((data) => {
          document.querySelector(".header-nav").innerHTML = data;
        })
        .catch((error) => {
          console.log("Ocorreu algum erro");
        });
    },
  },
  mounted() {
    this.loadNav();
    new DropdownnMenu("[data-dropdown]").init();
    new MenuMobile('[data-menu="button"]', '[data-menu="list"]').init();
    new NavMenuItems(".nav-center .nav-link").init();
  },
});
