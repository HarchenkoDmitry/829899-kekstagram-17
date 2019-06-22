'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var closeForm = form.querySelector('.img-upload__cancel');
  var modalContainer = form.querySelector('.img-upload__overlay');
  var inputUploadFile = form.querySelector('#upload-file');

  function showForm() {
    modalContainer.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
  }

  function onFormEscPress(evt) {
    if (evt.keyCode === 27 && !document.activeElement.classList.contains('text__description')) {
      hideForm();
    }
  }

  function hideForm() {
    modalContainer.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
    form.reset();
    window.resetPhotoChanges();
  }

  inputUploadFile.addEventListener('change', function () {
    var file = inputUploadFile.files[0];
    if (~file.type.indexOf('image')) {
      showForm();

      window.applyEffectOnImage();
    }
  });

  closeForm.addEventListener('click', function () {
    hideForm();
  });
})();
