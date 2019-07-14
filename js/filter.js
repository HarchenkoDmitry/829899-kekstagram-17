'use strict';

(function () {
  function filter(data) {
    var AMOUNT_NEW_PICTURES = 10;
    var DELAY_TIME = 500;
    var FilterName = {
      POPULAR: 'filter-popular',
      NEW: 'filter-new',
      DISCUSSED: 'filter-discussed'
    };
    var picturesData = data;
    var filterContainer = document.querySelector('.img-filters');
    var filterButtons = filterContainer.querySelectorAll('.img-filters__button');
    var activeClassButton = 'img-filters__button--active';
    var timerId = 0;
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
      filterButtons.forEach(function (btnItem) {
        btnItem.classList.remove(activeClassButton);
      });
      btn.classList.add(activeClassButton);

      clearTimeout(timerId);

      timerId = setTimeout(function () {
        if (buttonChecked !== btn) {
          applyFilter(btn.id);
          buttonChecked = btn;
        }
      }, DELAY_TIME);
    }

    function applyFilter(filterName) {
      var sortedPictures = picturesData.slice();

      switch (filterName) {

        case FilterName.NEW:
          sortedPictures = sortedPictures
            .sort(function () {
              return Math.random() - 0.5;
            })
            .slice(-AMOUNT_NEW_PICTURES);
          break;

        case FilterName.DISCUSSED:
          sortedPictures = sortedPictures
            .sort(function (first, second) {
              return second.comments.length - first.comments.length;
            });
          break;
      }

      window.renderPictures(sortedPictures);
    }

    showFilter();
    addHandlerToFilter();
  }

  window.filter = filter;
})();
