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



    // commentField: function() {
    //   if (comment.required || comment.value.length === 0) {
    //     reviewFieldsText.style.display = 'none';
    //   } else {
    //     reviewFieldsName.style.display = 'block';
    //   }
    // },

    inspectionStars: function() {
      var radio = formOnPage.elements['review-mark'].value;
      if (radio < 3) {
        comment.setAttribute('required', 'required');
      } else {
        comment.removeAttribute('required');
        reviewFieldsName.style.display = 'none';
      }
      if (comment.required && comment.value !== "") {
        reviewFieldsText.style.display = 'none';
      }
    },

    // nameUserField: function() {
    //   if (nameUser.value.length === 0) {
    //     reviewFieldsName.style.display = 'block';
    //   } else {
    //     reviewFieldsName.style.display = 'none';
    //   }
    // },

    // validateForm: function() {
    //   form.inspectionStars();
    //   if (!nameUser.value) {
    //     form.formIsValid();
    //     reviewFieldsName.classList.add('invisible');
    //   } else {
    //     form.formIsNotValid();
    //     reviewFieldsName.classList.remove('invisible');
    //   }
    //   if (comment.required && comment.value.length === 0 ) {
    //     form.formIsNotValid();
    //     reviewFieldsText.classList.remove('invisible');
    //   } else {
    //     form.formIsValid();
    //     reviewFieldsText.classList.add('invisible');
    //   }
    // }

    validateForm: function() {
      var formValidOk = true;
      form.inspectionStars();
      if (!nameUser.value) {
        formValidOk = false;
      }
      if (comment.required && comment.value.length === 0) {
        formValidOk = false;
        reviewFields.style.display = 'none';
      } else {
        formValidOk = true;
      }

      if (formValidOk) {
        button.removeAttribute('disabled');
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
