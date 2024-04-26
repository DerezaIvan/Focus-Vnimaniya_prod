export function initSlider() {
	new Swiper(".image-slider", {
		navigation: {
			nextEl: ".next",
			prevEl: ".prev",
		},
		grabCursor: true,
		slideToClickedSlide: true,
		// высота картинок
		// autoHeight: true,
		// количество слайдов для показа
		slidesPerView: 4,
		// отступ между слайдами
		spaceBetween: 44,
		// количество пролистываемых слайдов
		slidesPerGroup: 1,
		// активный слайд по центру
		centeredSlides: true,
		// стартовый слайд
		initialSlide: 5,
		// бесконечный слайдер
		loop: true,
		// адаптивные слайды
		breakpoints: {
			// начиная с мобильного экрана
			320: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
			480: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1025: {
				slidesPerView: 3.5,
			},
		},
	});
}
