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
      form.formIsNotValid();
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    formIsNotValid: function() {
      button.disabled = true;
      reviewFields.classList.remove('invisible');
    },

    formIsValid: function() {
      button.disabled = false;
      reviewFields.classList.add('invisible');
    },

    inspectionStars: function() {
      var radio = formOnPage.elements['review-mark'].value;
      console.log(typeof radio);
      if (radio < 3) {
        comment.setAttribute('required', 'required');
      } else {
        comment.removeAttribute('required');
      }
    },

    validateForm: function() {
      form.inspectionStars();
      if (nameUser.value.length === 0) {
        form.formIsNotValid();
        reviewFieldsName.classList.remove('invisible');
      } else {
        form.formIsValid();
        reviewFieldsName.classList.add('invisible');
      }
      if (comment.required && comment.value.length === 0 ) {
        form.formIsNotValid();
        reviewFieldsText.classList.remove('invisible');
      } else {
        form.formIsValid();
        reviewFieldsText.classList.add('invisible');
      }
    }
  };

  formOnPage.onchange = form.validateForm;
  formOnPage.oninput = form.validateForm;

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;

})();
