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

  function renderPictures(pictures) {
    var pictureContainer = document.querySelector('.pictures');
    var picturesWrap = pictureContainer.querySelectorAll('.picture');
    var fragment = createPictures(pictures);

    picturesWrap.forEach(function (picture) {
      pictureContainer.removeChild(picture);
    });
    pictureContainer.appendChild(fragment);
  }

  function successHandler(pictures) {
    renderPictures(pictures);
    window.filter(pictures);
    addHandlerToGallery(pictures);
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

  function addHandlerToGallery(picturesData) {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (picture, i) {
      picture.addEventListener('click', function () {
        window.renderFullScreenPhoto(picturesData[i]);
      });
    });
  }

  window.backend(successHandler, errorHandler);
  window.renderPictures = renderPictures;
})();
