// Hàm xly các handle click next page, phổ biến,mới nhất,..v.v.v
function setupFilterButtons() {
  // Handle Sort header :
  var popularFilter = document.getElementById("popular");
  popularFilter.onclick = function () {
      setFilterButton(popularFilter);
      shuffle();
  }

  var newProductFilter = document.getElementById("new-product");
  newProductFilter.onclick = function () {
      setFilterButton(newProductFilter);
      sortByDate();
  }

  // Số lượng bán chạy nhất
  var saledFilter = document.getElementById("saled");
  saledFilter.onclick = function () {
      setFilterButton(saledFilter);
      sortBySelling();
  }

  // Xắp xếp giảm dần
  var sortDownFilter = document.getElementById("sort_down");
  sortDownFilter.onclick = function () {
      sortDataPriceDown();
  }

  // Xắp xếp giảm tăng dần
  var sortUpFilter = document.getElementById("sort_up");
  sortUpFilter.onclick = function () {
      sortDataPriceUp();
  }

  // Hàm Chuyển Number Page
  var homeFilterPage = document.querySelectorAll('.home-filter-page-btn');

  homeFilterPage[0].onclick = function () {
      var currentPage = document.querySelector('.home-filter-page-now');
      if (currentPage.textContent != 1) {
          currentPage.textContent = Number(currentPage.textContent) - 1;
          shuffle();
      }
      if (currentPage.textContent != 14) {
          homeFilterPage[1].classList.remove('home-filter-page-btn--disable');
      }
      if (currentPage.textContent == 1) {
          homeFilterPage[0].classList.add('home-filter-page-btn--disable');
      }
  }

  homeFilterPage[1].onclick = function () {
      var currentPage = document.querySelector('.home-filter-page-now');
      if (currentPage.textContent != 14) {
          currentPage.textContent = Number(currentPage.textContent) + 1;
          shuffle();
      }
      if (currentPage.textContent != 1) {
          homeFilterPage[0].classList.remove('home-filter-page-btn--disable');
      }
      if (currentPage.textContent == 14) {
          homeFilterPage[1].classList.add('home-filter-page-btn--disable');
      }
  }

  var headerCatagoryItems = document.querySelectorAll('.header__sort-item');

  for (var i = 0; i < headerCatagoryItems.length && i < 4; i++) {
      if (headerCatagoryItems[i]) {
          headerCatagoryItems[i].onclick = function () {
              var headerCatagoryActive = document.querySelector('.header__sort-item--active');
              headerCatagoryActive.classList.remove('header__sort-item--active');
              this.classList.add('header__sort-item--active');
              shuffle();
          };
      }
  }

  var mobileCatagoryItem = document.querySelectorAll('.mobile-category-item');

  for (var i = 0; i < mobileCatagoryItem.length; i++) {
      mobileCatagoryItem[i].onclick = function () {
          shuffle();
      }
  };

}


// Function xly click chuyển buttom
function setFilterButton(activeButton) {
  var filterActive = document.querySelector('.home-filter-btn.btn--primary');
  filterActive.classList.remove('btn--primary');
  activeButton.classList.add('btn--primary');
}
