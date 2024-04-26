import { initSlider } from "./slider.js";

(function () {
	const token = "6538342286:AAHOrzyzSHDUl_Q1qNCjloNBzgeBG9JIGi0";
	const chatId = "-1002107521234";
	const urlApi = `https://api.telegram.org/bot${token}/sendMessage`;

	document.getElementById("form").addEventListener("submit", function (e) {
		e.preventDefault();
		let message = "<b>Привет! У Вас есть новая заявка:</b>\n";
		message += `<b>Имя: </b> ${this.name.value}\n`;
		message += `<b>Фамилия: </b> ${this.lastName.value}\n`;
		message += `<b>Номер телефона: </b> ${this.phone.value}\n`;
		message += `<b>E-mail: </b> ${this.email.value}\n`;
		message += `<b>Ник в Telegram: </b> ${this.telegram.value}\n`;
		message += `<b>Ник в Instagram: </b> ${this.insta.value}\n`;
		message += `<b>Ниша: </b> ${this.niche.value}\n`;
		message += `<b>Доход: </b> ${this.income.value}\n`;

		const involvement = document.querySelector(
			'input[name="involvement"]:checked'
		);
		if (involvement) {
			message += `<b>Тип участия: </b> ${involvement.value}\n`;
		} else {
			message += `<b>Тип участия: </b> не выбран\n`;
		}

		axios
			.post(urlApi, {
				chat_id: chatId,
				parse_mode: "html",
				text: message,
			})
			.then(() => {
				// После успешной отправки формы в телеграм можно закрыть модальное окно
				const popup = document.getElementById("popup");
				if (popup) {
					popup.classList.remove("active");
				}
				showApplicationWindow();
				document.getElementById("form").reset();
			})
			.catch((error) => {
				console.error("Ошибка отправки в телеграм:", error);
				alert(
					"Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
				);
			});
	});

	function showApplicationWindow() {
		const application = document.getElementById("application");
		application.classList.add("active");

		setTimeout(() => {
			application.classList.remove("active");
			window.location.reload();
		}, 2000);
	}

	// Функция для отправки формы спикера
	function sendSpeakerForm() {
		let message = "<b>Привет! У Вас есть новая анкета спикера:</b>\n";
		message += `<b>Имя: </b> ${this.form.name.value}\n`;
		message += `<b>Фамилия: </b> ${this.form.lastName.value}\n`;
		message += `<b>Номер телефона: </b> ${this.form.phone.value}\n`;
		message += `<b>E-mail: </b> ${this.form.email.value}\n`;
		message += `<b>Ник в Telegram: </b> ${this.form.telegram.value}\n`;
		message += `<b>Ник в Instagram: </b> ${this.form.insta.value}\n`;
		message += `<b>Ниша: </b> ${this.form.niche.value}\n`;
		message += `<b>Доход: </b> ${this.form.income.value}\n`;

		console.log(message);

		axios
			.post(urlApi, {
				chat_id: chatId,
				parse_mode: "html",
				text: message,
			})
			.then(() => {
				// После успешной отправки формы в телеграм можно закрыть модальное окно
				const popup = document.getElementById("popup");
				if (popup) {
					popup.classList.remove("active");
				}
				showApplicationWindow();
				document.getElementById("form").reset();
			})
			.catch((error) => {
				console.error("Ошибка отправки в телеграм:", error);
				alert(
					"Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
				);
			});
	}

	// Class definition
	class App {
		constructor() {
			this.init();
		}

		init() {
			initSlider();
			this.popup = document.getElementById("popup");
			this.popupCloseBtn = document.getElementById("close__form");
			this.btnFormOpen = document.querySelectorAll(".btn-register");
			this.burgerMenu = document.getElementById("hamburger-menu");
			this.burgerMenuBtn = document.getElementById("menu__toggle");
			this.burgerMenuBtnClose = document.getElementById("menu__toggle-close");
			this.menuItems = document.querySelectorAll(".menu__items-link");
			this.ratesCardTitles = document.querySelectorAll(".rates__card-title");
			this.form = document.getElementById("form");
			this.formTitle = document.getElementById("popup__title");
			this.speakerBtn = document.getElementById("speaker__btn");

			this.modalClose();
			this.modalOpenBtnRegister();
			this.burgerMenuOpen();
			this.burgerMenuClose();
			this.closeMenuClick();
			this.ratesCardsClick();
			this.speakerForm();
		}

		modalOpen() {
			this.popup.classList.add("active");
			document.body.style.overflow = "hidden";
		}

		modalOpenBtnRegister() {
			this.btnFormOpen.forEach((btn) => {
				btn.addEventListener("click", () => {
					this.modalOpen();
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

		speakerForm() {
			this.speakerBtn.addEventListener("click", () => {
				const checkboxContainer = document.querySelector(".involvement");
				checkboxContainer.style.display = "none";
				this.modalOpen();
				this.formTitle.textContent = "Анкета спикера";

				const speakerInputs = [
					{ label: "Имя", name: "name", pattern: "^[+0-9()-]+$" },
					{
						label: "Фамилия",
						name: "lastName",
						pattern: "^[a-zA-Zа-яА-ЯЁё0-9\\s,.:;-]+$",
					},
					{ label: "Номер телефона", name: "phone", pattern: "^[+0-9()-]+$" },
					{
						label: "Ник в Telegram",
						name: "telegram",
						pattern: "^[a-zA-Z0-9_]+$",
					},
					{
						label: "Ссылка на Instagram",
						name: "insta",
						pattern: "^[a-zA-Z0-9_]+$",
					},
					{
						label: "Экспертность. Ниша, опыт работы, кейсы",
						name: "niche",
						pattern: "^[a-zA-Zа-яА-ЯЁё0-9\\s,.:;-]+$",
					},
					{
						label: "Опыт публичных выступлений",
						name: "experience",
						pattern: "^[a-zA-Zа-яА-ЯЁё0-9\\s,.:;-]+$",
					},
					{
						label: "Ссылка на видео выступлений",
						name: "videoLink",
						pattern: '^(http|https):\\/\\/[^ "]+$',
					},
				];

				const formGroups = document.querySelectorAll(".form__group");
				formGroups.forEach((group, index) => {
					const input = document.createElement("input");
					input.type = "text";
					input.classList.add("form__input");
					input.id = input.name = speakerInputs[index].name;
					input.required = true;
					input.pattern = speakerInputs[index].pattern;

					const label = document.createElement("label");
					label.htmlFor = input.id;
					label.classList.add("form__label");
					label.textContent = speakerInputs[index].label;

					const error = document.createElement("span");
					error.classList.add("message__error");
					error.id = input.id + "__error";
					error.textContent = `Пожалуйста, введите корректное значение`;

					group.innerHTML = "";
					group.appendChild(input);
					group.appendChild(label);
					group.appendChild(error);
				});

				const formSubtitle = document.createElement("p");
				formSubtitle.classList.add("form__subtitle");
				formSubtitle.innerHTML = `
					Дорогой спикер, благодарим тебя за желание выступать на наших мероприятиях. 
					Заполни форму максимально подробно и честно, прикрепляя ссылки на свои прошлые выступления. 
					Если опыта нет, это тоже не страшно, пиши честно свой текущий опыт, 
					у нас предусмотрены разные пакеты участия.
		
					На каждое мероприятие мы получаем огромное количество заявок и очень тщательно формируем спикерский состав, 
					мы свяжемся с вами в порядке очереди. Если с вами не связались, не расстраивайтесь, 
					к сожалению, количество спикеров каждом мероприятии ограничено, 
					но мы всех вносим в базу спикеров и свяжемся с вами в следующий раз.
				`;
				this.form.insertBefore(formSubtitle, this.form.firstChild);

				const involvementGroup = document.querySelector(".involvement");
				involvementGroup.insertAdjacentHTML(
					"beforeend",
					`
					<span class="message__error">Пожалуйста, выберите тип участия</span>
					`
				);

				const agreementGroup = document.querySelector(".agreement-checkbox");
				agreementGroup.innerHTML = `
					<div class="checkbox">
						<input
							type="checkbox"
							id="agreement"
							name="agreement"
							class="checkbox__agree"
							required
						/>
						<label for="agreement">Согласен на обработку персональных данных</label>
					</div>
				`;

				const submitBtn = document.getElementById("btn-submit");
				submitBtn.textContent = "Отправить заявку";

				const formInputs = this.form.querySelectorAll(
					"input:not([type='submit']), textarea"
				);
				formInputs.forEach((input) => {
					input.addEventListener("input", () => {
						this.validateFormSpeaker();
					});
				});

				// Добавляем обработчик события на кнопку отправки
				submitBtn.addEventListener("click", sendSpeakerForm.bind(this));
			});
		}

		validateFormSpeaker() {
			const formInputs = this.form.querySelectorAll(
				"input:not([type='submit']), textarea, input[type='checkbox']"
			);
			let isFormValid = true;

			formInputs.forEach((input) => {
				// Если поле обязательное, проверяем его наличие и валидность
				if (input.hasAttribute("required")) {
					if (input.type === "checkbox") {
						if (!input.checked) {
							isFormValid = false;
						}
					} else {
						if (!input.value.trim()) {
							isFormValid = false;
						}
					}
				}
			});

			// Разблокируем кнопку отправки в зависимости от валидности формы
			const submitBtn = document.getElementById("btn-submit");
			submitBtn.disabled = !isFormValid;
		}
	}

	// Initialize the App
	new App();
})();
