'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var inputUploadFile = form.querySelector('#upload-file');

  var formModal = new window.Modal('.img-upload__overlay');

  formModal.onModalEscPress = function (evt) {
    if (evt.keyCode === 27 && !document.activeElement.classList.contains('text__description')) {
      formModal.close();
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
})();
