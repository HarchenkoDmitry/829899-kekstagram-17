'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  function Picture(data) {
    this.url = data.url;
    this.likes = data.likes;
    this.description = data.description;
    this.comments = data.comments;
  }

  Picture.prototype.create = function () {
    var pictureClone = pictureTemplate.cloneNode(true);
    var img = pictureClone.querySelector('.picture__img');
    var likes = pictureClone.querySelector('.picture__likes');
    var comments = pictureClone.querySelector('.picture__comments');

    img.src = this.url;
    likes.textContent = this.likes;
    comments.textContent = String(this.comments.length);

    return pictureClone;
  };


  window.Picture = Picture;
})();
