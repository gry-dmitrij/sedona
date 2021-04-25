"use strict";

document.addEventListener('DOMContentLoaded', function () {
	const navigation = document.querySelector('.nav-list');
	const closeButton = document.querySelector('.nav-box__close-btn');
	const switchButton = document.querySelector('.nav-box__burger-btn');
	hideNavigation();

	closeButton.addEventListener('click', function (event) {
		hideNavigation(event);
	});

	switchButton.addEventListener('click', function (event) {
		switchNavigation(event);
	});
	function hideNavigation(event) {
		if (event) event.preventDefault();

		navigation.classList.add('nav-list--hide');
		closeButton.classList.add('button-icon--hide');
	}

	function switchNavigation(event) {
		if (event) event.preventDefault();
		navigation.classList.toggle('nav-list--hide');
		closeButton.classList.toggle('button-icon--hide');
	}
});
