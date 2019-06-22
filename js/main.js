'use strict';

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
var MIN_VALUE_SCALE = 25;
var MAX_VALUE_SCALE = 100;
var STEP_SCALE = 25;
var FILTER_DATA = {
  none: {
    name: '',
    minValue: 0,
    maxValue: 0,
    dimension: ''
  },
  chrome: {
    name: 'grayscale',
    minValue: 0,
    maxValue: 1,
    dimension: ''
  },
  sepia: {
    name: 'sepia',
    minValue: 0,
    maxValue: 1,
    dimension: ''
  },
  marvin: {
    name: 'invert',
    minValue: 0,
    maxValue: 100,
    dimension: '%'
  },
  phobos: {
    name: 'blur',
    minValue: 0,
    maxValue: 3,
    dimension: 'px'
  },
  heat: {
    name: 'brightness',
    minValue: 1,
    maxValue: 3,
    dimension: ''
  }
};
var form = document.querySelector('.img-upload__form');
var modalContainer = form.querySelector('.img-upload__overlay');
var closeForm = form.querySelector('.img-upload__cancel');
var inputUploadFile = form.querySelector('#upload-file');
var imgPreview = form.querySelector('.img-upload__preview img');
var imgsEffectEffect = form.querySelectorAll('.effects__preview');
var valueScaleControl = form.querySelector('.scale__control--value');
var btnZoomOut = form.querySelector('.scale__control--smaller');
var btnZoomOn = form.querySelector('.scale__control--bigger');
var imageEffectSwitches = form.querySelectorAll('.effects__radio');
var sliderLevelEffect = form.querySelector('.img-upload__effect-level');
var pinLevelEffect = form.querySelector('.effect-level__pin');
var depthLevelEffect = form.querySelector('.effect-level__depth');
var currentEffectName = 'none';
var currentFilter = FILTER_DATA[currentEffectName];

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

function createPictures(pictures) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment = generateFragment(fragment, pictureTemplate, pictures[i]);
  }
  return fragment;
}

function generateFragment(fragment, tamplate, picture) {
  var pictureClone = tamplate.cloneNode(true);
  var img = pictureClone.querySelector('.picture__img');
  var likes = pictureClone.querySelector('.picture__likes');
  var comments = pictureClone.querySelector('.picture__comments');

  img.src = picture.url;
  likes.textContent = picture.likes;
  comments.textContent = picture.comments.length;

  fragment.appendChild(pictureClone);

  return fragment;
}

function renderPictures(pictures) {
  var pictureContainer = document.querySelector('.pictures');
  var fragment = createPictures(pictures);

  pictureContainer.appendChild(fragment);
}

function getRandomNumber(minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
}

function showForm() {
  modalContainer.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscPress);
}

function onFormEscPress(evt) {
  if (evt.keyCode === 27 && !document.activeElement.classList.contains('text__description')) {
    hideForm();
  }
}

function hideForm() {
  modalContainer.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscPress);
  clearForm();
}

function clearForm() {
  form.reset();
  imgPreview.style.transform = '';
  imgPreview.classList.remove(imgPreview.classList[0]);
  currentEffectName = 'none';
  currentFilter = FILTER_DATA[currentEffectName];
  changeLevelEffects(1, '');
}

function resizeImage() {
  btnZoomOut.addEventListener('click', function () {
    resize(-1);
  });

  btnZoomOn.addEventListener('click', function () {
    resize(1);
  });
}

function resize(sign) {
  var size = parseInt(valueScaleControl.value, 10) + STEP_SCALE * sign;
  if (size > MAX_VALUE_SCALE) {
    size = MAX_VALUE_SCALE;
  } else if (size < MIN_VALUE_SCALE) {
    size = MIN_VALUE_SCALE;
  }
  valueScaleControl.value = size + '%';
  imgPreview.style.transform = 'scale(' + (size / 100) + ')';
}

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

function applyEffectOnImage() {
  changeEffect(imageEffectSwitches[0]);
  imageEffectSwitches.forEach(function (item) {
    item.addEventListener('click', function () {
      changeEffect(item);
    });
  });
}

function changeEffect(item) {
  var effectName = item.value;
  imgPreview.classList.remove('effects__preview--' + currentEffectName);
  imgPreview.classList.add('effects__preview--' + effectName);
  sliderLevelEffect.classList.toggle('hidden', imgPreview.classList.contains('effects__preview--none'));
  currentEffectName = effectName;

  currentFilter = FILTER_DATA[effectName];
  changeLevelEffects(1, currentFilter);
}

function addMouseEventListener() {
  var container = document.querySelector('.img-upload__effect-level');
  var pinContainer = container.querySelector('.effect-level__line');

  pinLevelEffect.addEventListener('mousedown', function (evt) {
    var posCenterOfPin = pinLevelEffect.getBoundingClientRect().left + pinLevelEffect.getBoundingClientRect().width / 2;
    var shift = evt.clientX - posCenterOfPin;
    var posPinContainer = pinContainer.getBoundingClientRect().left;
    var widthPinContainer = pinContainer.getBoundingClientRect().width;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var posPinInPercent = (moveEvt.clientX - shift - posPinContainer) / widthPinContainer;

      if (posPinInPercent >= 1) {
        posPinInPercent = 1;
      } else if (posPinInPercent <= 0) {
        posPinInPercent = 0;
      }

      changeLevelEffects(posPinInPercent, currentFilter);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  changeLevelEffects(1, '');
}

function changeLevelEffects(ratio, filter) {
  var filterRatio = ratio * (filter.maxValue - filter.minValue) + filter.minValue;

  pinLevelEffect.style.left = ratio * 100 + '%';
  depthLevelEffect.style.width = ratio * 100 + '%';
  imgPreview.style.filter = (filter) ? filter.name + '(' + filterRatio + filter.dimension + ')' : '';
}

window.onload = function () {
  var pictures = generateMok();

  renderPictures(pictures);

  inputUploadFile.addEventListener('change', function () {
    var file = inputUploadFile.files[0];
    if (~file.type.indexOf('image')) {
      renderPreviewImg(file);
      showForm();

      applyEffectOnImage();
    }
  });

  closeForm.addEventListener('click', function () {
    hideForm();
  });

  resizeImage();
  addMouseEventListener();
};
