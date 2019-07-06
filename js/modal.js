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
    var modal = this;
    var container = document.querySelector(classNameModal);
    var btnClose = container.querySelector('.cancel');
    this.onOpen = function () {};
    this.onClose = function () {};

    this.open = function () {
      modal.onOpen();
      container.classList.remove('hidden');
      document.addEventListener('keydown', this.onModalEscPress);
      scrollBar.off();
    };

    this.close = function () {
      modal.onClose();
      container.classList.add('hidden');
      document.removeEventListener('keydown', this.onModalEscPress);
      scrollBar.on();
    };

    this.onModalEscPress = function (evt) {
      if (evt.keyCode === 27) {
        modal.close();
      }
    };

    btnClose.addEventListener('click', modal.close);
  }

  // Modal.prototype.open = function () {
  //   this.container.classList.remove('hidden');
  //   document.addEventListener('keydown', onModalEscPress);
  // };

  // Modal.prototype.close = function () {
  //   this.container.classList.add('hidden');
  //   document.removeEventListener('keydown', onModalEscPress);
  // };

  window.Modal = Modal;
})();
