(function () {
	const Form = {
		proccesBtn: null,
		fields: [
			{
				name: "name-speaker",
				id: "name-speaker",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
				valid: false,
				labelElement: null,
			},
			{
				name: "last-name-speaker",
				id: "last-name-speaker",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
				valid: false,
				labelElement: null,
			},
			{
				name: "phone-speaker",
				id: "phone-speaker",
				element: null,
				errorElement: null,
				regex: /^\d{11}$/,
				valid: false,
				labelElement: null,
			},
			{
				name: "telegram-speaker",
				id: "telegram-speaker",
				element: null,
				errorElement: null,
				regex: /^[A-Za-z\d_@]{5,32}$/,
				valid: false,
				labelElement: null,
			},
			{
				name: "insta-speaker",
				id: "insta-speaker",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Z0-9_]{1,30}$/, // Исправлено
				valid: false,
				labelElement: null,
			},
			{
				name: "niche-speaker",
				id: "niche-speaker",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?]+$/,
				valid: false,
				labelElement: null,
			},
			{
				name: "public-speaker",
				id: "public-speaker",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?]+$/,
				valid: false,
				labelElement: null,
			},
			{
				name: "link-speaker",
				id: "link-speaker",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?]+$/,
				valid: false,
				labelElement: null,
			},
		],
		init() {
			const that = this;
			this.fields.forEach((item) => {
				item.element = document.getElementById(item.id);
				item.errorElement = document.getElementById(`${item.id}__error`);
				item.labelElement = document.getElementById(`${item.id}__label`);
				item.element.onchange = function (e) {
					that.validateField.call(that, item, e.target);
				};
			});
			const agreeElement = document.getElementById("agree");
			agreeElement.onchange = function () {
				that.validateForm();
			};

			this.proccesBtn = document.getElementById("speaker__btn-submit");
			this.proccesBtn.addEventListener("click", function () {
				that.validateForm();
				that.submitForm();
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

			if (validForm) {
				this.proccesBtn.removeAttribute("disabled");
			} else {
				this.proccesBtn.setAttribute("disabled", "disabled");
			}
		},

		submitForm() {
			const that = this;
			const speakerForm = document.getElementById("form__speaker");
			speakerForm.addEventListener("submit", function (e) {
				e.preventDefault();
				const token = "6538342286:AAHOrzyzSHDUl_Q1qNCjloNBzgeBG9JIGi0";
				const chatId = "-1002107521234";
				const urlApi = `https://api.telegram.org/bot${token}/sendMessage`;

				let message = "<b>Привет! У Вас есть новая анкета спикера:</b>\n";
				message += `<b>Имя: </b> ${this.name.value}\n`;
				message += `<b>Фамилия: </b> ${this.lastName.value}\n`;
				message += `<b>Номер телефона: </b> ${this.phone.value}\n`;
				message += `<b>Ник в Telegram: </b> ${this.telegram.value}\n`;
				message += `<b>Ник в Instagram: </b> ${this.insta.value}\n`;
				message += `<b>Ниша: </b> ${this.niche.value}\n`;
				message += `<b>Опыт публичных выступлений: </b> ${this.public.value}\n`;
				message += `<b>Ссылка на видео выступлений: </b> ${this.link.value}\n`;

				axios
					.post(urlApi, {
						chat_id: chatId,
						parse_mode: "html",
						text: message,
					})
					.then(() => {
						// После успешной отправки формы в телеграм можно закрыть модальное окно
						const popup = document
							.getElementById("speaker__popup")
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
			document.getElementById("form__speaker").reset();
		},
	};
	Form.init();
})();
