import { initSlider } from "./slider.js";

(function () {
	// Class definition
	class App {
		constructor() {
			this.init();
		}

		init() {
			initSlider();
			this.popup = document.getElementById("popup");
			this.popupSpeaker = document.getElementById("speaker__popup");
			this.popupCloseBtn = document.getElementById("close__form");
			this.popupCloseBtnSpeaker = document.getElementById(
				"speaker__close-form"
			);
			this.btnFormOpen = document.querySelectorAll(".btn-register");
			this.btnFormOpenSpeaker = document.getElementById("speaker__btn");
			this.burgerMenu = document.getElementById("hamburger-menu");
			this.burgerMenuBtn = document.getElementById("menu__toggle");
			this.burgerMenuBtnClose = document.getElementById("menu__toggle-close");
			this.menuItems = document.querySelectorAll(".menu__items-link");
			this.ratesCard = document.querySelectorAll(".rates__card-adaptive");
			this.form = document.getElementById("form");
			this.formSpeaker = document.getElementById("form__speaker");
			this.formTitle = document.getElementById("popup__title");
			this.speakerBtn = document.getElementById("speaker__btn");

			this.modalClose();
			this.modalCloseSpeaker();
			this.modalOpenBtnRegister();
			this.modalOpenBtnSpeaker();
			this.burgerMenuOpen();
			this.burgerMenuClose();
			this.closeMenuClick();
			this.ratesCardsClick();
		}

		modalOpen() {
			this.popup.classList.add("active");
			document.body.style.overflow = "hidden";
		}

		modalOpenSpeaker() {
			this.popupSpeaker.classList.add("active");
			document.body.style.overflow = "hidden";
		}

		modalOpenBtnRegister() {
			this.btnFormOpen.forEach((btn) => {
				btn.addEventListener("click", () => {
					this.modalOpen();
				});
			});
		}

		modalOpenBtnSpeaker() {
			this.btnFormOpenSpeaker.addEventListener("click", () => {
				this.modalOpenSpeaker();
			});
		}

		modalClose() {
			this.popupCloseBtn.addEventListener("click", () => {
				this.popup.classList.remove("active");
				this.form.reset();
				window.location.reload();
			});
		}

		modalCloseSpeaker() {
			this.popupCloseBtnSpeaker.addEventListener("click", () => {
				this.popupSpeaker.classList.remove("active");
				this.form.reset();
				window.location.reload();
			});
		}

		burgerMenuOpen() {
			this.burgerMenuBtn.addEventListener("click", () => {
				this.burgerMenu.classList.add("active");
				this.burgerMenuBtnClose.classList.add("active");
			});
		}

		burgerMenuClose() {
			this.burgerMenuBtnClose.addEventListener("click", (e) => {
				e.preventDefault();
				this.burgerMenu.classList.remove("active");
				this.burgerMenuBtnClose.classList.remove("active");
			});
		}

		closeMenuClick() {
			this.menuItems.forEach((item) => {
				item.addEventListener("click", () => {
					this.burgerMenu.classList.remove("active");
					this.burgerMenuBtnClose.classList.remove("active");
				});
			});
		}

		ratesCardsClick() {
			// Устанавливаем активный класс для первого элемента
			const firstCard = this.ratesCard[0].closest(".rates__card-adaptive");
			firstCard.classList.add("active");

			this.ratesCard.forEach((item) => {
				item.addEventListener("click", () => {
					this.ratesCard.forEach((card) => {
						card.classList.remove("active");
					});
					item.classList.add("active");
				});
			});
		}
	}

	// Initialize the App
	new App();
})();
