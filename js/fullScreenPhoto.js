'use strict';

(function () {
  var fullScreenModal = new window.Modal('.big-picture');
  var modalContainer = document.querySelector('.big-picture');
  var photo = modalContainer.querySelector('.big-picture__img img');
  var description = modalContainer.querySelector('.social__caption');
  var likes = modalContainer.querySelector('.likes-count');
  var commentsCount = modalContainer.querySelector('.social__comment-count');
  var commentLoader = modalContainer.querySelector('.comments-loader');

  commentsCount.classList.add('visually-hidden');
  commentLoader.classList.add('visually-hidden');

  function renderPhoto(picture) {
    fullScreenModal.open();
    photo.src = picture.url;
    description.textContent = picture.description;
    likes.textContent = picture.likes;
    renderComments(picture.comments);
  }

  function renderComments(commentsData) {
    var commentsContainer = document.querySelector('.social__comments');
    var comments = commentsContainer.querySelectorAll('.social__comment');
    var fragment = document.createDocumentFragment();
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

    comments.forEach(function (comment) {
      commentsContainer.removeChild(comment);
    });

    commentsData.forEach(function (comment) {
      var commentClone = commentTemplate.cloneNode(true);
      var img = commentClone.querySelector('.social__picture');
      var text = commentClone.querySelector('.social__text');
      img.src = comment.avatar;
      text.textContent = comment.message;
      fragment.appendChild(commentClone);
    });

    commentsContainer.appendChild(fragment);
  }

  window.renderFullScreenPhoto = renderPhoto;
})();
