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
  var reviewMark = formOnPage.elements['review-mark'].value;
  var now = new Date();
  var GraceBirthday = new Date(now.getFullYear(), 11, 9);

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
      if (reviewMark < 3) {
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
        reviewFieldsName.classList.add('invisible');
      } else {
        isFormValid = false;
        reviewFieldsName.classList.remove('invisible');
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
      var cookiesMark = window.Cookies.set('review-mark', reviewMark, {expires: form.shelfLifeCookies});
      var cookiesName = window.Cookies.set('review-name', reviewFieldsName.value, {expires: form.shelfLifeCookies});
      return {
        cookiesMark: cookiesMark,
        cookiesName: cookiesName
      };

    },
    getCookies: function() {
      var getFieldMark = window.Cookies.get('review-mark');
      var getFieldName = window.Cookies.get('review-name');
      // return {
      //   getFieldMark: getFieldMark,
      //   getFieldName: getFieldName
      // };
      if (reviewFieldsName.value) {
        reviewFieldsName.value = getFieldName;
      }
      if (reviewMark) {
        reviewMark = getFieldMark;
      }
    },

  };
    // onchange ловит событие на input radio(звездах), oninput этого не делает, поэтому добавила его
  formOnPage.onchange = form.validateForm;
  formOnPage.oninput = form.validateForm;
  // formOnPage.onchange = form.getTheShelfLife;
  reviewFieldsName.addEventListener('change', form.saveCookies);
  reviewMark.addEventListener('input', form.saveCookies);
  form.open.addEventListener('change', form.getCookies);


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;

})();
