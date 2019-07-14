'use strict';

(function () {
  var COMMENT_AMOUNT = 5;
  var fullScreenModal = new window.Modal('.big-picture');
  var modalContainer = document.querySelector('.big-picture');
  var photo = modalContainer.querySelector('.big-picture__img img');
  var description = modalContainer.querySelector('.social__caption');
  var likes = modalContainer.querySelector('.likes-count');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsContainer = modalContainer.querySelector('.social__comments');
  var commentsLoader = modalContainer.querySelector('.comments-loader');
  var currentCount = modalContainer.querySelector('.comments-current-count');
  var count = modalContainer.querySelector('.comments-count');
  var loadMoreComments = function () {};

  function addHandlerOnCommentsLoader() {
    commentsLoader.addEventListener('click', loadMoreComments);
  }

  function makeCountComments() {
    var currentCountComments = 0;

    return function () {
      currentCountComments += COMMENT_AMOUNT;
      return currentCountComments;
    };
  }

  function renderPhoto(picture) {
    var countComments = makeCountComments();
    loadMoreComments = function () {
      renderComments(picture.comments, countComments);
    };
    photo.src = picture.url;
    description.textContent = picture.description;
    likes.textContent = picture.likes;
    renderComments(picture.comments, countComments);
    addHandlerOnCommentsLoader();
    fullScreenModal.open();
  }

  function renderComments(commentsData, countComments) {
    var fragment = document.createDocumentFragment();
    var currentCountComments = countComments();

    var endCount = calculateCountComments(commentsData, currentCountComments);

    for (var i = currentCountComments - COMMENT_AMOUNT; i < endCount; i++) {
      var commentClone = createComment(commentsData[i]);
      fragment.appendChild(commentClone);
    }

    commentsContainer.appendChild(fragment);
  }

  function createComment(comment) {
    var commentClone = commentTemplate.cloneNode(true);
    var img = commentClone.querySelector('.social__picture');
    var text = commentClone.querySelector('.social__text');
    img.src = comment.avatar;
    text.textContent = comment.message;

    return commentClone;
  }

  function calculateCountComments(commentsData, currentCountComments) {
    var commentsAmount = commentsData.length;
    var isMoreComments = commentsAmount < currentCountComments;
    var endCount = isMoreComments ? commentsAmount : currentCountComments;

    commentsLoader.classList.toggle('hidden', isMoreComments);

    currentCount.textContent = endCount;
    count.textContent = commentsAmount;

    return endCount;
  }

  function resetPhoto() {
    var comments = commentsContainer.querySelectorAll('.social__comment');

    photo.src = '';
    description.textContent = '';
    likes.textContent = '';

    comments.forEach(function (comment) {
      commentsContainer.removeChild(comment);
    });
  }

  fullScreenModal.onClose = function () {
    resetPhoto();
    commentsLoader.removeEventListener('click', loadMoreComments);
  };

  window.renderFullScreenPhoto = renderPhoto;
})();
