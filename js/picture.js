'use strict';

(function () {
  function renderPicture(fragment, template, picture) {
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

  window.renderPicture = renderPicture;
})();
