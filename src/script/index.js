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
		this.formTitle = document.getElementById("form__partner-title");

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
				document.body.style.overflow = "hidden";
			});
		});
	}

	modalClose() {
		this.popupCloseBtn.addEventListener("click", () => {
			this.popup.classList.remove("active");
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

				this.form.style.display = "none";
				this.popup.querySelector(".container").style.height = "300px";
				this.formTitle.textContent =
					"Спасибо за Вашу заявку, мы свяжемся с Вами в ближайшее время!";
				setTimeout(() => {
					this.popup.classList.remove("active");
					this.form.reset();
					window.location.reload();
				}, 3000);
			} else {
				alert("Заполните пожалуйста все поля");
			}
		});
	}

	validateForm() {
		// Получаем все обязательные поля формы
		const inputs = this.form.querySelectorAll(".form__partner-form-input");

		// Регулярные выражения для валидации
		const regexPatterns = {
			name: /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/,
			last: /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/,
			email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			phone: /^\d{11}$/,
			telegram: /^[A-Za-z\d_]{5,32}$/,
			instagram: /^[a-zA-Z0-9_.]{1,30}$/,
			income: /^\d+(\.\d{2})?$/,
		};

		let allValid = true; // Флаг для обозначения общей валидности формы

		const markAsInvalid = (input) => {
			input.classList.add("invalid");
			allValid = false;
		};

		// Функция для удаления класса invalid
		const markAsValid = (input) => {
			input.classList.remove("invalid");
		};

		// Добавляем обработчик события input для каждого поля ввода
		inputs.forEach((input) => {
			const value = input.value.trim();
			const fieldName = input.getAttribute("name");
			const regex = regexPatterns[fieldName];
			const errorSpan = input.nextElementSibling;

			// Если значение пустое, помечаем поле как невалидное и пропускаем проверку регулярным выражением
			if (value === "") {
				markAsInvalid(input);
				errorSpan.style.display = "block";
			} else {
				// Если значение не пустое, проверяем его на соответствие регулярному выражению
				if (!regex.test(value)) {
					markAsInvalid(input);
					errorSpan.style.display = "block";
				} else {
					markAsValid(input);
					errorSpan.style.display = "none";
				}
			}
		});

		// Проверка выбора типа участия
		const involvementFields = this.form.querySelectorAll(
			"[name='involvement']"
		);
		let involvementChecked = false;
		for (const field of involvementFields) {
			if (field.checked) {
				involvementChecked = true;
				break;
			}
		}
		if (!involvementChecked) {
			const errorMessage = this.form.querySelector(
				".checkboxs .message__error"
			);
			if (errorMessage) {
				errorMessage.textContent = "Пожалуйста, выберите тип участия";
				errorMessage.style.display = "block";
			}
			allValid = false;
		} else {
			const errorMessage = this.form.querySelector(
				".checkboxs .message__error"
			);
			if (errorMessage) {
				errorMessage.textContent = "";
				errorMessage.style.display = "none";
			}
		}

		// Проверка согласия с условиями
		const agreementFields = this.form.querySelectorAll(
			"[name='offer'], [name='personal-date'], [name='distribution']"
		);
		let agreementChecked = true;
		for (const field of agreementFields) {
			if (!field.checked) {
				agreementChecked = false;
				break;
			}
		}
		if (!agreementChecked) {
			const errorMessage = this.form.querySelector(
				".agreement-checkbox .message__error"
			);
			if (errorMessage) {
				errorMessage.textContent = "Пожалуйста, подтвердите согласие";
				errorMessage.style.display = "block";
			}
			allValid = false;
		} else {
			const errorMessage = this.form.querySelector(
				".agreement-checkbox .message__error"
			);
			if (errorMessage) {
				errorMessage.textContent = "";
				errorMessage.style.display = "none";
			}
		}

		// Возвращаем общую валидность формы
		return allValid;
	}
}

// Initialize the App
new App();
