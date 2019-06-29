'use strict';

(function () {
  var filter = function (data) {
    var AMOUNT_NEW_PICTURES = 10;
    var DELAY_TIME = 500;
    var FilterName = {
      POPULAR: 'filter-popular',
      NEW: 'filter-new',
      DISCUSSED: 'filter-discussed'
    };
    var pictures = data;
    var filterContainer = document.querySelector('.img-filters');
    var filterButtons = filterContainer.querySelectorAll('.img-filters__button');
    var activeClassButton = 'img-filters__button--active';
    var timerId;
    var buttonChecked = filterButtons[0];

    function showFilter() {
      filterContainer.classList.remove('img-filters--inactive');
    }

    function addHandlerToFilter() {
      filterContainer.addEventListener('click', function (evt) {
        if (evt.target.type === 'button' && !evt.target.classList.contains(activeClassButton)) {
          changeFilter(evt.target);
        }
      });
    }

    function changeFilter(btn) {
      var filterName = btn.id;

      filterButtons.forEach(function (btnItem) {
        btnItem.classList.remove(activeClassButton);
      });
      btn.classList.add(activeClassButton);

      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(function () {
        if (buttonChecked !== btn) {
          applyFilter(pictures, filterName);
          timerId = null;
          buttonChecked = btn;
        }
      }, DELAY_TIME);
    }

    function applyFilter(picturesData, filterName) {
      var sortedPictures;

      switch (filterName) {

        case FilterName.POPULAR:
          sortedPictures = picturesData;
          break;

        case FilterName.NEW:
          sortedPictures = picturesData
            .slice()
            .sort(function () {
              return Math.random() - 0.5;
            })
            .slice(-AMOUNT_NEW_PICTURES);
          break;

        case FilterName.DISCUSSED:
          sortedPictures = picturesData
            .slice()
            .sort(function (first, second) {
              return second.comments.length - first.comments.length;
            });
          break;
      }

      window.renderPictures(sortedPictures);
    }

    showFilter();
    addHandlerToFilter();
  };

  window.filter = filter;
})();
