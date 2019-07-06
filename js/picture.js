'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  function Picture(data) {
    this.url = data.url;
    this.likes = data.likes;
    this.description = data.description;
    this.comments = data.comments;

    this.pictureClone = pictureTemplate.cloneNode(true);

    this.pictureClone.addEventListener('click', render);

    function render() {
      window.renderFullScreenPhoto(data);
    }

    this.remove = function (pictureItem) {
      this.pictureClone.removeEventListener('click', render);
      picturesContainer.removeChild(pictureItem);
    };
  }

  Picture.prototype.create = function () {
    var img = this.pictureClone.querySelector('.picture__img');
    var likes = this.pictureClone.querySelector('.picture__likes');
    var comments = this.pictureClone.querySelector('.picture__comments');

    img.src = this.url;
    likes.textContent = this.likes;
    comments.textContent = String(this.comments.length);

    return this.pictureClone;
  };


  window.Picture = Picture;
})();
