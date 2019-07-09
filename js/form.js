'use strict';

(function () {
  var mainContainer = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var inputUploadFile = form.querySelector('#upload-file');
  var inputHashTags = form.querySelector('.text__hashtags');
  var inputComment = form.querySelector('.text__description');

  var formModal = new window.Modal('.img-upload__overlay');

  function addValidationHashTags() {
    var hashTags = inputHashTags.value
      .split(' ')
      .map(function (hashTag) {
        return hashTag.toLowerCase();
      });

    var message = '';

    if (hashTags.length > 5) {
      message = 'Нельзя указать больше пяти хэш-тегов';
    } else {
      for (var i = 0; i < hashTags.length; i++) {
        message = validationHashTag(hashTags, i);
        if (message) {
          break;
        }
      }
    }

    inputHashTags.setCustomValidity(message);
  }

  function validationHashTag(hashTags, i) {
    var message = '';
    if (hashTags[i].charAt(0) !== '#') {
      message = 'Хеш-теги должны начинаться с "#"';

    } else if (hashTags[i].length === 1) {
      message = 'Хеш-теги должны состоять хотя бы из одного символа';

    } else if (hashTags[i].indexOf('#', 1) > 0) {
      message = 'Хеш-теги должны разделяться пробелами';

    } else if (hashTags.indexOf(hashTags[i], i + 1) > 0) {
      message = 'Один и тот же хэш-тег не может быть использован дважды';

    } else if (hashTags[i].length > 20) {
      message = 'Максимальная длина одного хэш-тега 20 символов';
    }
    return message;
  }

  function onSuccess() {
    formModal.close();
    showMessage('success');
  }

  function onError() {
    showMessage('error');
  }

  function showMessage(classNameMessage) {
    var messageTemplate = document.querySelector('#' + classNameMessage)
      .content.querySelector('.' + classNameMessage)
      .cloneNode(true);
    mainContainer.appendChild(messageTemplate);
    messageTemplate.addEventListener('click', hideMessage);
    document.addEventListener('keydown', onMessageEscPress);
  }

  function onMessageEscPress(evt) {
    if (evt.keyCode === 27) {
      hideMessage();
    }
  }

  function hideMessage() {
    var message = mainContainer.querySelector('.messageLoad');
    mainContainer.removeChild(message);
    document.removeEventListener('keydown', onMessageEscPress);
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.save(data, onSuccess, onError);
  });

})();
