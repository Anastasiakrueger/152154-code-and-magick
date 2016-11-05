'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var nameUser = document.querySelector('#review-name');
  var reviewNameFields = document.querySelector('.review-fields-name');
  var reviewFieldsText = document.querySelector('.review-fields-text');
  var reviewFields = document.querySelector('.review-fields');
  var formOnPage = document.querySelector('.review-form');
  var button = document.querySelector('.review-form-control');
  var comment = document.querySelector('#review-text');
  // var reviewMark = formOnPage.elements['review-mark'].value;
  var reviewMarkField = formOnPage.elements['review-mark'];
  var now = new Date();
  var GraceBirthday = new Date(now.getFullYear(), 11, 9);
  var buttonOpenForm = document.querySelector('.reviews-controls-new');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      nameUser.setAttribute('required', 'required');
      button.setAttribute('disabled', 'disabled');
      reviewFieldsText.classList.add('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    hasManyStars: function() {
      if (reviewMarkField.value < 3) {
        comment.setAttribute('required', 'required');
      } else {
        comment.removeAttribute('required');
        reviewFieldsText.classList.add('invisible');
      }
    },

    validateForm: function() {
      var isFormValid = true;
      form.hasManyStars();
      if (nameUser.value) {
        reviewNameFields.classList.add('invisible');
      } else {
        isFormValid = false;
        reviewNameFields.classList.remove('invisible');
      }
      if (comment.required && comment.value.length === 0) {
        isFormValid = false;
        reviewFieldsText.classList.remove('invisible');
      } else {
        reviewFieldsText.classList.add('invisible');
      }

      if (isFormValid) {
        button.removeAttribute('disabled');
        reviewFields.classList.add('invisible');
      } else {
        button.setAttribute('disabled', 'disabled');
        reviewFields.classList.remove('invisible');
      }
    },

    getTheShelfLife: function() {
      if (GraceBirthday > now) {
        GraceBirthday.setFullYear(now.getFullYear() - 1);
      }
      var ShelfLifeCookies = Math.round((now - GraceBirthday) / (3600 * 24 * 1000));
      return ShelfLifeCookies;
    },

    saveCookies: function() {
      var cookiesMark = window.Cookies.set('review-mark', reviewMarkField.value, {expires: form.getTheShelfLife()});
      var cookiesName = window.Cookies.set('review-name', nameUser.value, {expires: form.getTheShelfLife()});
      return {
        cookiesMark: cookiesMark,
        cookiesName: cookiesName
      };

    },
    getCookies: function() {

      var getFieldMark = window.Cookies.get('review-mark');
      var getFieldName = window.Cookies.get('review-name');
      nameUser.value = getFieldName;
      formOnPage.elements['review-mark'].value = getFieldMark;
    }
  };

  formOnPage.onchange = form.validateForm;
  formOnPage.oninput = form.validateForm;
  // formOnPage.addEventListener('change', form.validateForm);
  nameUser.addEventListener('input', form.saveCookies);

  for (var i = 0; i < reviewMarkField.length; i++) {
    reviewMarkField[i].addEventListener('change', form.saveCookies);
  }
  buttonOpenForm.addEventListener('click', form.getCookies);



  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;

})();
