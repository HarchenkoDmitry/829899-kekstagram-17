var MOK_COUNT = 25;
var COUNT_AVATARS = 6;
var MAX_NUMBER_OF_LIKES = 200;
var MIN_NUMBER_OF_LIKES = 15;
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
  for (var i = 0; i < MOK_COUNT; i++) {
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES),
      comments: [
        {
          avatar: 'img/avatar-' + getRandomNumber(1, COUNT_AVATARS) + '.jpg',
          message: COMMENT_TEMPLATE[getRandomNumber(0, COMMENT_TEMPLATE.length)],
          name: NAME_TEMPLATE[getRandomNumber(0, NAME_TEMPLATE.length)]
        },
        {
          avatar: 'img/avatar-' + getRandomNumber(1, COUNT_AVATARS) + '.jpg',
          message: COMMENT_TEMPLATE[getRandomNumber(0, COMMENT_TEMPLATE.length)],
          name: NAME_TEMPLATE[getRandomNumber(0, NAME_TEMPLATE.length)]
        },
      ]
    };
  }
  return pictures;
}

function createPictures(pictures) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pictures.length; i++) {
    var pictureClone = pictureTemplate.cloneNode(true);
    var img = pictureClone.querySelector('.picture__img');
    var likes = pictureClone.querySelector('.picture__likes');
    var comments = pictureClone.querySelector('.picture__comments');

    img.src = pictures[i].url;
    likes.textContent = pictures[i].likes;
    comments.textContent = pictures[i].comments.length;

    fragment.appendChild(pictureClone);
  }

  return fragment;
}

function renderPictures(pictures) {
  var pictureContainer = document.querySelector(".pictures");
  var fragment = createPictures(pictures);
  pictureContainer.appendChild(fragment);
}

function getRandomNumber(minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
}


window.onload = function () {
  pictures = generateMok();
  renderPictures(pictures);
};
