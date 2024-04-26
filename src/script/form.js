(function () {
	const Form = {
		proccesBtn: null,
		fields: [
			{
				name: "name",
				id: "name",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
				valid: false,
				label: null,
			},
			{
				name: "lastName",
				id: "last-name",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
				valid: false,
				label: null,
			},
			{
				name: "phone",
				id: "phone",
				element: null,
				errorElement: null,
				regex: /^\d{11}$/,
				valid: false,
				label: null,
			},
			{
				name: "telegram",
				id: "telegram",
				element: null,
				errorElement: null,
				regex: /^[A-Za-z\d_]{5,32}$/,
				valid: false,
				label: null,
			},
		],
		init() {
			const that = this;
			this.fields.forEach((item) => {
				item.element = document.getElementById(item.id);
				item.errorElement = document.getElementById(`${item.id}__error`);
				item.labelElement = document.getElementById(`${item.id}__label`);
				item.element.onchange = function () {
					that.validateField.call(that, item, this);
				};
			});

			this.proccesBtn = document.getElementById("btn-submit");
			this.proccesBtn.addEventListener("click", function () {
				that.validateForm();
				that.submitForm();
			});

			this.agreeElements = document.querySelectorAll(".checkbox__agree");
			this.agreeElements.forEach((element) => {
				element.addEventListener("change", function () {
					that.validateForm();
				});
			});

			const radioElements = document.querySelectorAll(
				'input[type="radio"][name="involvement"]'
			);
			radioElements.forEach((element) => {
				element.addEventListener("change", function () {
					that.validateForm();
				});
			});
		},
		validateField(field, element) {
			if (!element.value || !element.value.match(field.regex)) {
				element.parentNode.style.borderBottom = "1px solid #8F1C0C ";
				element.nextElementSibling.style.color = "#8F1C0C";
				field.labelElement.style.color = "#8F1C0C";
				field.errorElement.style.display = "block";
				field.valid = false;
			} else {
				element.parentNode.removeAttribute("style");
				element.nextElementSibling.removeAttribute("style");
				field.errorElement.style.display = "none";
				field.valid = true;
			}
		},

		validateForm() {
			const validForm = this.fields.every((item) => item.valid);
			const radioChecked = Array.from(
				document.querySelectorAll('input[type="radio"][name="involvement"]')
			).some((radio) => radio.checked);
			const allChecked = Array.from(this.agreeElements).every(
				(element) => element.checked
			);
			if (validForm && radioChecked && allChecked) {
				this.proccesBtn.removeAttribute("disabled");
			} else {
				this.proccesBtn.setAttribute("disabled", "disabled");
			}
		},
		submitForm() {
			const that = this;
			const form = document.getElementById("form");
			form.addEventListener("submit", function (e) {
				e.preventDefault();
				const token = "6538342286:AAHOrzyzSHDUl_Q1qNCjloNBzgeBG9JIGi0";
				const chatId = "-1002107521234";
				const urlApi = `https://api.telegram.org/bot${token}/sendMessage`;

				let message = "<b>Привет! У Вас есть новая заявка:</b>\n";
				message += `<b>Имя: </b> ${this.name.value}\n`;
				message += `<b>Фамилия: </b> ${this.lastName.value}\n`;
				message += `<b>Номер телефона: </b> ${this.phone.value}\n`;
				message += `<b>Ник в Telegram: </b> ${this.telegram.value}\n`;

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
						const popup = document
							.getElementById("popup")
							.classList.remove("active");
						that.showApplicationWindow();
					})
					.catch((error) => {
						console.error("Ошибка отправки в телеграм:", error);
						alert(
							"Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
						);
					});
			});
		},

		showApplicationWindow() {
			const application = document.getElementById("application");
			application.classList.add("active");
			setTimeout(() => {
				application.classList.remove("active");
				window.location.reload();
			}, 2000);
			document.getElementById("form").reset();
		},
	};
	Form.init();
})();
