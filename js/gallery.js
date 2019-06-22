'use strict';


(function () {
  var imgPreview = document.querySelector('.img-upload__preview img');
  var imgsEffectEffect = document.querySelectorAll('.effects__preview');
  var inputUploadFile = document.querySelector('#upload-file');

  function renderPreviewImg(file) {
    var reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    } else {
      imgPreview.src = '';
    }

    reader.addEventListener('loadend', function () {
      imgPreview.src = reader.result;
      imgsEffectEffect.forEach(function (img) {
        img.style.backgroundImage = 'url(' + reader.result + ')';
      });
    });
  }

  inputUploadFile.addEventListener('change', function () {
    var file = inputUploadFile.files[0];
    if (~file.type.indexOf('image')) {
      renderPreviewImg(file);
    }
  });
})();
