'use strict';

(function () {
  var PICTURES_AMOUNT = 25;
  var AVATARS_AMOUNT = 6;
  var MAX_LIKES_AMOUNT = 200;
  var MIN_LIKES_AMOUNT = 15;
  var MAX_COMMENTS_AMOUNT = 10;
  var COMMENT_TEMPLATE = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAME_TEMPLATE = ['Кирилл', 'Тимур', 'Иван', 'Андрей', 'Владимир', 'Светлана', 'Нина', 'Татьяна', 'Елена', 'Галина'];

  function generateMok() {
    var pictures = [];
    for (var i = 0; i < PICTURES_AMOUNT; i++) {
      pictures[i] = generatePicture(i);
    }
    return pictures;
  }

  function generatePicture(i) {
    return {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(MIN_LIKES_AMOUNT, MAX_LIKES_AMOUNT),
      comments: generateRandomComment()
    };
  }

  function generateRandomComment() {
    var comments = [];
    var commentAmount = getRandomNumber(1, MAX_COMMENTS_AMOUNT);
    for (var i = 0; i < commentAmount; i++) {
      comments[i] = generateComment();
    }
    return comments;
  }

  function generateComment() {
    return {
      avatar: 'img/avatar-' + getRandomNumber(1, AVATARS_AMOUNT) + '.jpg',
      message: COMMENT_TEMPLATE[getRandomNumber(0, COMMENT_TEMPLATE.length)],
      name: NAME_TEMPLATE[getRandomNumber(0, NAME_TEMPLATE.length)]
    };
  }

  function getRandomNumber(minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  }

  window.pictures = generateMok();
})();
