import DropdownnMenu from "./modules/dropdownMenu.js";
import MenuMobile from "./modules/menuMobile.js";
import NavMenuItems from "./modules/navMenuItems.js";
import Modal from "./modules/modal.js";
import Input from "./components/input.js";
import Table from "./components/table.js";

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
      mainaddress: {
        necessary: true,
        value: "",
        error: "",
      },
      neighborhood: {
        necessary: true,
        value: "",
        error: "",
      },
      number: {
        necessary: true,
        value: "",
        error: "",
      },
      complement: {
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
  watch: {
    "people.postalCode.value"(nv) {
      this.fetchCep(nv.replace("-", ""));
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
    fetchCep(cep) {
      console.log(cep);
      if (cep.length === 8) {
        try {
          fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
              this.people.mainaddress.value = data.logradouro;
              this.people.neighborhood.value = data.bairro;
              this.people.complement.value = data.complemento;
              this.people.city.value = data.localidade;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    validateForm() {
      console.log(this.people);
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
  },
  components: {
    "input-vue": Input,
    "table-vue": Table,
  },
  mounted() {
    this.loadNav();
    new DropdownnMenu("[data-dropdown]").init();
    new MenuMobile('[data-menu="button"]', '[data-menu="list"]').init();
    new NavMenuItems(".nav-center .nav-link").init();
    new Modal().init();
  },
});
