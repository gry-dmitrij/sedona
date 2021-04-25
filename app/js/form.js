"use strict";

document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('.form');
	const textInputs = form.querySelectorAll('input[required]');
	const formButton = form.querySelector('.form__button');
	const failBlock = document.querySelector('.popup--fail').parentElement;
	const successBlock = document.querySelector('.popup--success').parentElement;
	const blockFailButton = failBlock.querySelector('.popup__button');
	const blockSuccessButton = successBlock.querySelector('.popup__button');
	blockFailButton.addEventListener('click', hideBlock);
	blockSuccessButton.addEventListener('click', hideBlock);

	formButton.addEventListener('click', checkForm);

	function checkTextInputs(textInputs) {
		let result = true;
		for (let i = 0; i < textInputs.length; i++) {
			if (textInputs[i].value.trim() === '') {
				result = false;
				highlight(textInputs[i]);
				textInputs[i].addEventListener('click', clearHighlight)
			}
		}
		return result;
	}

	function highlight(textInput) {
		textInput.classList.add('edit--fail')
	}

	function clearHighlight(event) {
		this.classList.remove('edit--fail');
		this.removeEventListener('click', clearHighlight);
	}

	function checkForm(event) {
		if (!checkTextInputs(textInputs)) {
			event.preventDefault();
			failBlock.classList.remove('popup-box--hide');
		} else {
			event.preventDefault();
			fetch(form.action, {
				method: 'POST',
				body: new FormData(form)
			})
				.then(response => {
					if (response.ok) {
						successBlock.classList.remove('popup-box--hide');
					}
				});
		}
	}

	function hideBlock(event) {
		event.preventDefault();
		const block = event.target.closest('.popup-box');
		block.classList.add('popup-box--hide');
	}
});
