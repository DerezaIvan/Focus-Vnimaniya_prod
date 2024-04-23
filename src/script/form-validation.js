// Валидация формы
export function validateForm() {
	const form = document.getElementById("form__partner-form");
	const inputs = form.querySelectorAll(".form__partner-form-input");
	const radioButtons = form.querySelectorAll('input[type="radio"]');
	const checkboxes = form.querySelectorAll('input[type="checkbox"]');
	let isValid = true;

	// Регулярные выражения для валидации
	const nameRegex = /^[а-яА-ЯёЁa-zA-Z]+$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^\d{11}$/;
	const incomeRegex = /^\d+(\.\d{2})?$/;

	// Проверка текстовых полей
	inputs.forEach((input) => {
		const value = input.value.trim();
		const fieldName = input.getAttribute("name");
		const errorSpan = input.nextElementSibling;

		if (value === "") {
			errorSpan.textContent = "Пожалуйста, заполните это поле";
			isValid = false;
		} else {
			switch (fieldName) {
				case "name":
				case "last":
					if (!nameRegex.test(value)) {
						errorSpan.textContent = "Пожалуйста, введите корректное значение";
						isValid = false;
					} else {
						errorSpan.textContent = "";
					}
					break;
				case "number":
					if (!phoneRegex.test(value)) {
						errorSpan.textContent =
							"Пожалуйста, введите 11-значный номер телефона";
						isValid = false;
					} else {
						errorSpan.textContent = "";
					}
					break;
				case "email":
					if (!emailRegex.test(value)) {
						errorSpan.textContent = "Пожалуйста, введите корректный e-mail";
						isValid = false;
					} else {
						errorSpan.textContent = "";
					}
					break;
				case "income":
					if (!incomeRegex.test(value)) {
						errorSpan.textContent =
							"Пожалуйста, введите корректный доход (число с двумя знаками после запятой)";
						isValid = false;
					} else {
						errorSpan.textContent = "";
					}
					break;
				default:
					errorSpan.textContent = "";
			}
		}
	});

	// Проверка радио кнопок
	let radioChecked = false;
	radioButtons.forEach((radio) => {
		if (radio.checked) {
			radioChecked = true;
		}
	});
	if (!radioChecked) {
		form.querySelector(".message__error[type='radio']").textContent =
			"Пожалуйста, выберите тип участия";
		isValid = false;
	} else {
		form.querySelector(".message__error[type='radio']").textContent = "";
	}

	// Проверка чекбоксов
	let checkboxChecked = false;
	checkboxes.forEach((checkbox) => {
		if (checkbox.checked) {
			checkboxChecked = true;
		}
	});
	if (!checkboxChecked) {
		form.querySelector(".message__error[type='checkbox']").textContent =
			"Пожалуйста, подтвердите согласие";
		isValid = false;
	} else {
		form.querySelector(".message__error[type='checkbox']").textContent = "";
	}

	return isValid;
}
