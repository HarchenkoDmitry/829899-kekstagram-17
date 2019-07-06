'use strict';


(function () {
  var imgPreview = document.querySelector('.img-upload__preview img');
  var imgsEffectEffect = document.querySelectorAll('.effects__preview');
  var inputUploadFile = document.querySelector('#upload-file');
  var pictures = [];


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

  function createPictures(picturesData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picturesData.length; i++) {
      pictures[i] = new window.Picture(picturesData[i]);
      fragment.appendChild(pictures[i].create());
    }
    return fragment;
  }

  function renderPictures(picturesData) {
    var pictureContainer = document.querySelector('.pictures');
    var picturesWrap = pictureContainer.querySelectorAll('.picture');

    picturesWrap.forEach(function (pictureItem, i) {
      pictures[i].remove();
    });

    var fragment = createPictures(picturesData);

    pictureContainer.appendChild(fragment);
  }

  function successHandler(picturesData) {
    renderPictures(picturesData);
    window.filter(picturesData);
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
