'use strict';

document.addEventListener('DOMContentLoaded', function () {
	const noJs = document.querySelectorAll('.no-js');
	noJs.forEach(function (elem) {
		elem.classList.remove('no-js');
	});
});
