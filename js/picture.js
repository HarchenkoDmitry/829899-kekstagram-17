'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  function Picture(data) {
    this.data = data;
    this.url = data.url;
    this.likes = data.likes;
    this.description = data.description;
    this.comments = data.comments;

    this.pictureElement = pictureTemplate.cloneNode(true);
  }

  Picture.prototype.create = function () {
    var img = this.pictureElement.querySelector('.picture__img');
    var likes = this.pictureElement.querySelector('.picture__likes');
    var comments = this.pictureElement.querySelector('.picture__comments');

    img.src = this.url;
    likes.textContent = this.likes;
    comments.textContent = String(this.comments.length);

    this.pictureElement.addEventListener('click', this.callRendering.bind(this));

    return this.pictureElement;
  };

  Picture.prototype.remove = function () {
    this.pictureElement.removeEventListener('click', this.callRendering);
    picturesContainer.removeChild(this.pictureElement);
  };

  Picture.prototype.callRendering = function () {
    window.renderFullScreenPhoto(this.data);
  };

  window.Picture = Picture;
})();
