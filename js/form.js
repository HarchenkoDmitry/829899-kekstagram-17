'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var inputUploadFile = form.querySelector('#upload-file');
  var inputHashTags = form.querySelector('.text__hashtags');
  var inputComment = form.querySelector('.text__description');

  var formModal = new window.Modal('.img-upload__overlay');

  function addValidationHashTags() {
    var arrayHashTags = inputHashTags.value
      .split(' ')
      .map(function (hashTag) {
        return hashTag.toLowerCase();
      });

    var message = '';

    if (arrayHashTags.length > 5) {
      message = 'Нельзя указать больше пяти хэш-тегов';

    } else {
      for (var i = 0; i < arrayHashTags.length; i++) {

        if (arrayHashTags[i].charAt(0) !== '#') {
          message = 'Хеш-теги должны начинаться с \"#\"';
          break;

        } else if (arrayHashTags[i].length === 1) {
          message = 'Хеш-теги должны состоять хотя бы из одного символа';
          break;

        } else if (arrayHashTags[i].indexOf('#', 1) !== -1) {
          message = 'Хеш-теги должны разделяться пробелами';
          break;

        } else if (arrayHashTags.indexOf(arrayHashTags[i], i + 1) !== -1) {
          message = 'Один и тот же хэш-тег не может быть использован дважды';
          break;

        } else if (arrayHashTags[i].length >= 20) {
          message = 'Максимальная длина одного хэш-тега 20 символов';
          break;
        }
      }
    }

    inputHashTags.setCustomValidity(message);
  }

  formModal.onModalEscPress = function (evt) {
    if (evt.keyCode === 27) {
      var focusElement = document.activeElement;
      if (focusElement !== inputComment && focusElement !== inputHashTags) {
        formModal.close();
      }
    }
  };

  formModal.onClose = function () {
    form.reset();
    window.resetPhotoChanges();
  };

  inputUploadFile.addEventListener('change', function () {
    var file = inputUploadFile.files[0];
    if (~file.type.indexOf('image')) {
      formModal.open();

      window.applyEffectOnImage();
    }
  });

  inputHashTags.addEventListener('input', function () {
    addValidationHashTags();
  });

})();
