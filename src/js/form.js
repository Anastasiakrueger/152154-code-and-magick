'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var nameUser = document.querySelector('#review-name');
  var reviewFieldsName = document.querySelector('.review-fields-name');
  var reviewFieldsText = document.querySelector('.review-fields-text');
  var reviewFields = document.querySelector('.review-fields');
  var formOnPage = document.querySelector('.review-form');
  var button = document.querySelector('.review-form-control');
  var comment = document.querySelector('#review-text');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      nameUser.setAttribute('required', 'required');
      button.setAttribute('disabled', 'disabled');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    inspectionStars: function() {
      var radio = formOnPage.elements['review-mark'].value;
      if (radio < 3) {
        comment.setAttribute('required', 'required');
      } else {
        comment.removeAttribute('required');
      }
    },

    fieldNameHint: function() {
      if (nameUser.value.length !== 0) {
        reviewFieldsName.classList.add('invisible');
        console.log('wtf');
      } else {
        reviewFieldsName.classList.remove('invisible');
      }
    },

    fieldTextHint: function() {
      form.inspectionStars();
      if (comment.required && comment.value === '') {
        reviewFieldsText.classList.add('invisible');
      } else {
        reviewFieldsText.classList.remove('invisible');
      }
    },

    validateForm: function() {
      var formValidOk = true;
      form.inspectionStars();
      if (!nameUser.value) {
        formValidOk = false;
        reviewFieldsName.classList.remove('invisible');
      } else {
        reviewFieldsName.classList.add('invisible');
      }
      if (comment.required && comment.value.length === 0) {
        formValidOk = false;
        reviewFieldsText.classList.remove('invisible');
      } else {
        reviewFieldsText.classList.add('invisible');
      }

      if (formValidOk) {
        button.removeAttribute('disabled');
        reviewFields.classList.add('invisible');
      } else {
        button.setAttribute('disabled', 'disabled');
      }
    }

  };
    // onchange ловит событие на input radio(звездах), oninput этого не делает, поэтому добавила его
  formOnPage.onchange = form.validateForm;
  formOnPage.oninput = form.validateForm;


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;

})();
