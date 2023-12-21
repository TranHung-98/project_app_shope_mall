// Hande Sort header :
var homeFilter = document.querySelectorAll('.home-filter-btn');

for (var i = 0; i < 2; i++) {
    homeFilter[i].onclick = function () {
        var homeFilterActive = document.querySelector('.home-filter-btn.btn--primary');
        homeFilterActive.classList.remove('btn--primary');
        this.classList.add('btn--primary');
        shuffer();
    }
}

var saledFilter = document.getElementById("saled");

//Hàm xắp xếp Số lượng bán chạy
saledFilter.onclick = function(){
    var homeFilterActive = document.querySelector('.home-filter-btn.btn--primary');
    homeFilterActive.classList.remove('btn--primary');
    this.classList.add('btn--primary');
    selling();
}

var homeFilterSortDown = document.getElementById("sort_down");
var homeFilterSortUp = document.getElementById("sort_up");

//Hàm xắp xếp Price
homeFilterSortDown.onclick = function () {
    sortDataPriceDown();
}

homeFilterSortUp.onclick = function () {
    sortDataPriceUp();
}


// Hàm Chuyển Number Page
var homeFilterPage = document.querySelectorAll('.home-filter-page-btn');

homeFilterPage[0].onclick = function () {
    var currentPage = document.querySelector('.home-filter-page-now');
    if (currentPage.textContent != 1) {
        currentPage.textContent = Number(currentPage.textContent) - 1;
        shuffer();
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
        shuffer();
    }
    if (currentPage.textContent != 1) {
        homeFilterPage[0].classList.remove('home-filter-page-btn--disable');
    }
    if (currentPage.textContent == 14) {
        homeFilterPage[1].classList.add('home-filter-page-btn--disable');
    }
}

// End Hàm Click  Next Page



// catagory : Phổ biến và Mới nhất khi click
var headerCatagoryItems = document.querySelectorAll('.header__sort-item');

for (var i = 0; i < headerCatagoryItems.length && i < 4; i++) {
    if (headerCatagoryItems[i]) {
        headerCatagoryItems[i].onclick = function () {
            var headerCatagoryActive = document.querySelector('.header__sort-item--active');
            headerCatagoryActive.classList.remove('header__sort-item--active');
            this.classList.add('header__sort-item--active');
            shuffer();
        };
    }
}


var mobileCatagoryItem = document.querySelectorAll('.mobile-category-item');

for (var i = 0; i < mobileCatagoryItem.length; i++) {
    mobileCatagoryItem[i].onclick = function () {
        shuffer();
    }
};
// End Hàm Click  Phổ biến và Mới nhất khi click
