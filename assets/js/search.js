$(document).ready(function (e) {

  $(document).on('click', '#btn-search', function (event) {
    event.stopPropagation();
    var keyWord = $('#search').val();
    searchProductList(keyWord);
    $('.header__search-history').hide();
  });

  $('input[type="text"]').on('keypress', function (e) {
    e.stopPropagation();
    if (e.which == 13) {
      var keyWord = $('#search').val();
      searchProductList(keyWord);
      $('.header__search-history').hide();
    }
  });

  var isOnClick = false;

  $(document).on('click', '.header__search-input-wrap', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if(isOnClick){
      $('.header__search-history').hide();
    }else {
      $('.header__search-history').show();
    }

    isOnClick = !isOnClick;

  });

  // Handle the click event on each search history item
  $(document).on('click', '.header__search-history-item a', function (event) {
    event.preventDefault();
    event.stopPropagation();

    var searchText = $(this).text();
    $('#search').val(searchText);

    $('.header__search-history').hide();
    $('.close-icon').show();
  });

  // Bắt sự kiện input để kiểm tra giá trị và hiển thị/close class
  $('#search').on('input', function() {
    var inputValue = $(this).val();

    if (inputValue !== '') {
      $('.close-icon').show();
    } else {
      $('.close-icon').hide();
    }
  });

  $('.close-icon').on('click', function() {
    $('#search').val('');
    $(this).hide();
  });
/// End handle click and close value\


});


