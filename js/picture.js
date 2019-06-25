'use strict';

(function () {
  function renderPictures(pictures) {
    var pictureContainer = document.querySelector('.pictures');
    var fragment = createPictures(pictures);

    pictureContainer.appendChild(fragment);
  }

  function createPictures(pictures) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment = generateFragment(fragment, pictureTemplate, pictures[i]);
    }
    return fragment;
  }

  function generateFragment(fragment, template, picture) {
    var pictureClone = template.cloneNode(true);
    var img = pictureClone.querySelector('.picture__img');
    var likes = pictureClone.querySelector('.picture__likes');
    var comments = pictureClone.querySelector('.picture__comments');

    img.src = picture.url;
    likes.textContent = picture.likes;
    comments.textContent = String(picture.comments.length);

    fragment.appendChild(pictureClone);

    return fragment;
  }

  function successHandler(pictures) {
    renderPictures(pictures);
  }

  function errorHandler(errorMassage) {
    var massageContainer = document.createElement('div');
    massageContainer.textContent = errorMassage;
    massageContainer.classList.add('error-massage');
    document.body.appendChild(massageContainer);
  }

  window.backend(successHandler, errorHandler);
})();
