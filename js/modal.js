'use strict';

(function () {
  var scrollBar = {
    off: function () {
      document.body.style.width = document.body.clientWidth + 'px';
      document.body.parentElement.style.overflowY = 'hidden';
    },

    on: function () {
      document.body.parentElement.style.overflowY = '';
      document.body.style.width = '';
    }
  };

  function Modal(classNameModal) {
    this.container = document.querySelector(classNameModal);
    var btnClose = this.container.querySelector('.cancel');

    btnClose.addEventListener('click', this.close.bind(this));
  }

  Modal.prototype.open = function () {
    this.onOpen();
    this.container.classList.remove('hidden');
    document.addEventListener('keydown', this.onModalEscPress.bind(this));
    scrollBar.off();
  };

  Modal.prototype.close = function () {
    this.onClose();
    this.container.classList.add('hidden');
    document.removeEventListener('keydown', this.onModalEscPress.bind(this));
    scrollBar.on();
  };

  Modal.prototype.onModalEscPress = function (evt) {
    if (evt.keyCode === 27) {
      this.close();
    }
  };

  Modal.prototype.onOpen = function () {};
  Modal.prototype.onClose = function () {};


  window.Modal = Modal;
})();
