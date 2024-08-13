export default class Modal {
  constructor() {
    this.actions = document.querySelectorAll(".grid-main-button");
    this.modal = document.querySelector(".modal-container");
    this.buttonModal = document.querySelector(".modal-button");

    this.actionsClick = this.actionsClick.bind(this);
    this.addToggle = this.addToggle.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  actionsClick() {
    this.actions.forEach((link) => {
      link.addEventListener("click", this.addToggle);
    });
  }

  addToggle(event) {
    console.log("click");
    this.modal.classList.toggle("active-modal");
  }

  closeModal(event) {
    if (event.target === this.modal) {
      this.addToggle(event);
    }
  }

  init() {
    if (this.modal && this.actions && this.buttonModal) {
      this.actionsClick();
      this.modal.addEventListener("click", this.closeModal);
      this.buttonModal.addEventListener("click", this.addToggle);
    }
    return this;
  }
}
