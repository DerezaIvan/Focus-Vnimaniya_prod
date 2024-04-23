// Import functions
import { initSlider } from "./slider.js";
function sendFormDataToTelegram(formData) {
	const token = "6538342286:AAHOrzyzSHDUl_Q1qNCjloNBzgeBG9JIGi0";
	const chatId = "-1002107521234";
	const urlApi = `https://api.telegram.org/bot${token}/sendMessage`;

	let message = "<b> Привет! У Вас есть новая заявка </b>\n";
	message += `Информация о пользователе: \n`;
	message += `<b>Имя: </b> ${formData.get("name")}\n`;
	message += `<b>Фамилия: </b> ${formData.get("last")}\n`;
	message += `<b>Номер телефона: </b> ${formData.get("number")}\n`;
	message += `<b>Электронная почта: </b> ${formData.get("email")}\n`;
	message += `<b>Ник в Телеграм: </b> ${formData.get("telegram")}\n`;
	message += `<b>Ник в Инстаграм: </b> ${formData.get("insta")}\n`;
	message += `<b>Ниша: </b> ${formData.get("niche")}\n`;
	message += `<b>Доход: </b> ${formData.get("income")}\n`;
	message += `<b>Тип участия: </b> ${formData.get("involvement")}\n`;

	fetch(urlApi, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chat_id: chatId,
			parse_mode: "html",
			text: message,
		}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {})
		.catch((error) => console.error("Error sending message:", error));
}

// Class definition
class App {
	constructor() {
		initSlider();
		this.init();
	}

	init() {
		this.popup = document.getElementById("form__popup");
		this.popupCloseBtn = document.getElementById("close__form");
		this.btnFormOpen = document.querySelectorAll(".btn-register");
		this.burgerMenu = document.getElementById("hamburger-menu");
		this.burgerMenuBtn = document.getElementById("menu__toggle");
		this.burgerMenuBtnClose = document.getElementById("menu__toggle-close");
		this.menuItems = document.querySelectorAll(".menu__items-link");
		this.ratesCards = document.querySelectorAll(".rates__card");
		this.ratesCardTitles = document.querySelectorAll(".rates__card-title");
		this.form = document.getElementById("form__partner-form");

		this.modalClose();
		this.modalOpen();
		this.burgerMenuOpen();
		this.burgerMenuClose();
		this.closeMenuClick();
		this.ratesCardsClick();
		this.handleFormSubmit();
	}

	modalOpen() {
		this.btnFormOpen.forEach((btn) => {
			btn.addEventListener("click", () => {
				this.popup.classList.add("active");
			});
		});
	}

	modalClose() {
		this.popupCloseBtn.addEventListener("click", () => {
			this.popup.classList.remove("active");
		});
	}

	burgerMenuOpen() {
		this.burgerMenuBtn.addEventListener("click", () => {
			this.burgerMenu.classList.add("active");
			this.burgerMenuBtnClose.classList.add("active");
		});
	}

	burgerMenuClose() {
		this.burgerMenuBtnClose.addEventListener("click", () => {
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
		this.ratesCardTitles.forEach((title) => {
			title.addEventListener("click", () => {
				const card = title.closest(".rates__card");
				card.classList.toggle("active");
			});
		});
	}

	handleFormSubmit() {
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();

			// Проверка формы перед отправкой
			if (this.validateForm()) {
				const formData = new FormData(this.form);
				sendFormDataToTelegram(formData);
			} else {
				// Если форма не прошла валидацию, отобразить сообщение об ошибке
				alert(
					"Пожалуйста, заполните все обязательные поля и введите корректные данные."
				);
			}
		});
	}

	validateForm() {
		// Получаем все обязательные поля формы
		const requiredFields = this.form.querySelectorAll("[required]");

		// Регулярные выражения для валидации
		const regexPatterns = {
			email: /^\S+@\S+\.\S+$/,
			phone: /^\d{11}$/,
			telegram: /^[\w]+$/,
			instagram: /^[\w]+$/,
			income: /^\d+(\.\d{2})?$/,
		};

		// Проверяем каждое обязательное поле
		for (const field of requiredFields) {
			// Если поле пустое, возвращаем false
			if (!field.value.trim()) {
				return false;
			}

			// Если поле имеет атрибут pattern, проверяем его
			if (field.hasAttribute("pattern")) {
				const pattern = new RegExp(field.getAttribute("pattern"));
				if (!pattern.test(field.value)) {
					return false;
				}
			}

			// Дополнительная валидация для некоторых полей посредством регулярных выражений
			if (field.name in regexPatterns) {
				const regexPattern = regexPatterns[field.name];
				if (!regexPattern.test(field.value)) {
					return false;
				}
			}
		}

		// Если все поля прошли проверку, возвращаем true
		return true;
	}
}

// Initialize the App
new App();
