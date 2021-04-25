'use strict';

document.addEventListener('DOMContentLoaded', () => {
	// блок поиска гостиниц
	const TABLET_WIDTH = 680;
	let hotelSearchBox = null;
	hotelSearchBox = document.querySelector('.hotel-search')
	// конпка закрытия формы поиска гостиниц
	const searchCloseBtn = document.querySelector('#close-search-hotel');
	searchCloseBtn.addEventListener('click', function (event) {
		hideSearchBox(event);
	});

	// скрываем форму поиска гостиниц при щелчке не по форме
	document.addEventListener('click', function (event) {
		if (!event.target.closest('.hotel-search')
			&& event.target.id !== 'search-hotel') {
			hideSearchBox(event);
		}
	})

	// показываем форму поиска гостиниц
	const findHotelBtn = document.querySelector('#search-hotel');
	findHotelBtn.addEventListener('click', function (event) {
		showSearchBox(event);
	});

	// показать форму поиска гостиниц
	function showSearchBox(event) {
		// на мобилках работает как ссылка
		if (window.innerWidth >= TABLET_WIDTH) {
			event.preventDefault();
			hotelSearchBox.classList.remove('visually-hidden');
		}
	}

	// скрыть форму поиска гостиниц
	function hideSearchBox(event) {
		if (!hotelSearchBox.classList.contains('visually-hidden')){
			event.preventDefault();
			hotelSearchBox.classList.add('visually-hidden');
		}
	}

});


