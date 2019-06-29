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

  function createPictures(pictures) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment = window.renderPicture(fragment, pictureTemplate, pictures[i]);
    }
    return fragment;
  }

  function renderPictures(picturesData) {
    var pictureContainer = document.querySelector('.pictures');
    var pictures = pictureContainer.querySelectorAll('.picture');
    var fragment = createPictures(picturesData);

    pictures.forEach(function (picture) {
      pictureContainer.removeChild(picture);
    });
    pictureContainer.appendChild(fragment);
  }

  function successHandler(pictures) {
    renderPictures(pictures);
    window.filter(pictures);
  }

  function errorHandler(errorMassage) {
    var massageContainer = document.createElement('div');
    massageContainer.textContent = errorMassage;
    massageContainer.classList.add('error-massage');
    document.body.appendChild(massageContainer);
  }


  inputUploadFile.addEventListener('change', function () {
    var file = inputUploadFile.files[0];
    if (~file.type.indexOf('image')) {
      renderPreviewImg(file);
    }
  });

  window.backend(successHandler, errorHandler);
  window.renderPictures = renderPictures;
})();
