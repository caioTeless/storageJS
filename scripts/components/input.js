export default {
  name: "Input",
  props: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    idFor: {
      type: String,
      default: "",
    },
    maxlength: null,
  },
  methods: {
    maskCep(value) {
      return value
        .replace(/\D/g, "")
        .slice(0, 8)
        .replace(/^(\d{5})(\d)/, "$1-$2");
    },
    maskPhone(value) {
      value = value.replace(/\D/g, "");
      if (value.length <= 10) {
        return value
          .replace(/^(\d{2})(\d)/g, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2");
      } else {
        return value
          .replace(/^(\d{2})(\d)/g, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2");
      }
    },

    onInput(event) {
      const inputId = event.target.id;
      if (inputId === "cep") {
        event.target.value = this.maskCep(
          event.target.value.replace(/\D/g, "")
        );
        this.$emit("input", this.maskCep(event.target.value));
      } else if (inputId === "phone") {
        event.target.value = this.maskPhone(
          event.target.value.replace(/\D/g, "")
        );
        this.$emit("input", this.maskPhone(event.target.value));
      } else {
        this.$emit("input", event.target.value);
      }
    },
  },
  computed: {
    formattedValue() {
      if (this.idFor === "cep" && this.value) {
        return this.maskCep(this.value);
      } else if (this.idFor === "phone") {
        return this.maskPhone(this.value);
      }
      return this.value;
    },
    maskedError() {
      if (this.name === "CEP" && this.value) {
        if (!this.value.match(/^\d{5}-\d{3}$/)) {
          return "CEP Inválido";
        }
      } else if (this.name === "Telefone" && this.value) {
        if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(this.value)) {
          return "Telefone Inválido";
        }
      }
      return this.error;
    },
  },
  template: `
    <span>
        <label :for="idFor" v-if="name != ''">{{name}}</label>
        <input :id="idFor" :type="type" :value="formattedValue" @input="onInput" :maxlength="maxlength" />
        <span class="error" v-if="maskedError">{{maskedError}}</span>
    </span>
  `,
};
