import DropdownnMenu from "./modules/dropdownMenu.js";
import MenuMobile from "./modules/menuMobile.js";
import NavMenuItems from "./modules/navMenuItems.js";
import Modal from "./modules/modal.js";

const app = new Vue({
  el: "#app",
  data: {
    people: {
      name: {
        necessary: true,
        value: "",
        error: "",
      },
      postalCode: {
        necessary: true,
        value: "",
        error: "",
      },
      address: {
        necessary: true,
        value: "",
        error: "",
      },
      city: {
        necessary: true,
        value: "",
        error: "",
      },
      phone: {
        necessary: false,
        value: "",
        error: "",
      },
      type: {
        necessary: true,
        value: "",
        error: "",
      },
    },
  },
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
    validateForm() {
      this.validFields();
    },
    validFields() {
      for (let field in this.people) {
        if (
          this.people[field].necessary &&
          this.people[field].value.trim() === ""
        ) {
          this.people[field].error = "É necessário o preenchimento.";
        } else {
          this.people[field].error = "";
        }
      }
    },

    validCep(cep) {
      var re = /^\d{5}-?\d{3}$/;
      return re.test(cep);
    },

    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
  mounted() {
    this.loadNav();
    new DropdownnMenu("[data-dropdown]").init();
    new MenuMobile('[data-menu="button"]', '[data-menu="list"]').init();
    new NavMenuItems(".nav-center .nav-link").init();
    new Modal().init();
  },
});
