(function () {
	const Form = {
		agreeElements: null,
		proccesBtn: null,
		fields: [
			{
				name: "name",
				id: "name",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
				valid: false,
			},
			{
				name: "lastName",
				id: "last-name",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
				valid: false,
			},
			{
				name: "phone",
				id: "phone",
				element: null,
				errorElement: null,
				regex: /^\d{11}$/,
				valid: false,
			},
			{
				name: "email",
				id: "email",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				valid: false,
			},
			{
				name: "telegram",
				id: "telegram",
				element: null,
				errorElement: null,
				regex: /^[A-Za-z\d_]{5,32}$/,
				valid: false,
			},
			{
				name: "instagram",
				id: "insta",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Z0-9_.]{1,30}$/,
				valid: false,
			},
			{
				name: "niche",
				id: "niche",
				element: null,
				errorElement: null,
				regex: /^[a-zA-Zа-яА-ЯёЁ]+$/,
				valid: false,
			},
			{
				name: "income",
				id: "income",
				element: null,
				errorElement: null,
				regex: /^\d+$/,
				valid: false,
			},
		],
		init() {
			const that = this;
			this.fields.forEach((item) => {
				item.element = document.getElementById(item.id);
				item.errorElement = document.getElementById(`${item.id}__error`);
				item.element.onchange = function () {
					that.validateField.call(that, item, this);
				};
			});

			this.proccesBtn = document.getElementById("btn-submit");
			this.proccesBtn.addEventListener("click", function (e) {
				that.validateForm();
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
	};
	Form.init();
})();
