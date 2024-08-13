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
        necessary: false,
        value: "",
        error: "",
      },
      mainaddress: {
        necessary: false,
        value: "",
        error: "",
      },
      neighborhood: {
        necessary: false,
        value: "",
        error: "",
      },
      number: {
        necessary: false,
        value: "",
        error: "",
      },
      complement: {
        necessary: false,
        value: "",
        error: "",
      },
      city: {
        necessary: false,
        value: "",
        error: "",
      },
      phone: {
        necessary: false,
        value: "",
        error: "",
      },
      type: {
        necessary: false,
        value: "",
        error: "",
      },
    },
    peopleList: [],
    localModel: [],
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
      if (this.validFields()) {
        this.peopleList.push(this.people);
      }
      this.peopleList.forEach((item) => {
        const values = Object.fromEntries(
          Object.entries(item).map(([key, data]) => [key, data.value])
        );
        localStorage.setItem(
          "people-" + item.name.value,
          JSON.stringify(values)
        );
      });
      this.getLocalStorage();
    },
    getLocalStorage() {
      const keyStorage = [];
      for (var key in localStorage) {
        if (key.includes("people")) {
          keyStorage.push(key);
        }
      }
      keyStorage.forEach((item) => {
        this.localModel.push(JSON.parse(localStorage.getItem(item)));
      });
    },
    validFields() {
      for (let field in this.people) {
        if (
          this.people[field].necessary &&
          this.people[field].value.trim() === ""
        ) {
          this.people[field].error = "Campo obrigatório.";
          return false;
        } else {
          this.people[field].error = "";
          return true;
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
    this.getLocalStorage();
  },
});
