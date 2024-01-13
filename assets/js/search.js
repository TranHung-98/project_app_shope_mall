$(document).ready(function (e) {

  $(document).on('click', '#btn-search', function (event) {
    event.stopPropagation();
    var keyWord = $('#search').val();
    searchProductList(keyWord, searchCallback);
    $('.header__search-history').hide();
  });

  
  $('input[type="text"]').on('keypress', function (e) {
    e.stopPropagation();
    if (e.which == 13) {
      var keyWord = $('#search').val();
      searchProductList(keyWord, searchCallback);
      $('.header__search-history').hide();
    }
  });



  var isOnFocus = false;
var isOnClick = false;
var delayTimer;

// Sự kiện click trên input
$(document).on('click', '.header__search-input-wrap', function (event) {
    event.preventDefault();
    event.stopPropagation();

    var hasValue = $('#search').val();

    if (hasValue !== '' && !isOnClick) {
        $('.header__search-history').show();

        // Kiểm tra xem giá trị đã tồn tại trong danh sách lịch sử chưa
        if (!$('.header__search-history-list a:contains(' + hasValue + ')').length) {
            // Nếu chưa tồn tại, thêm vào danh sách
            var listItem = $('<li class="header__search-history-item"><a href="#">' + hasValue + '</a></li>');
            $('.header__search-history-list').prepend(listItem);
        }
    } else {
        // Nếu click lần thứ 2, ẩn danh sách lịch sử
        $('.header__search-history').hide();
    }

    isOnClick = !isOnClick;
});

// Sự kiện input trên input
$('.header__search-input').on('input', function () {
    // Hiển thị lịch sử tìm kiếm nếu có giá trị
    if ($(this).val() && !isOnClick) {
        $('.header__search-history').show();
    } else {
        // Ẩn lịch sử tìm kiếm nếu không có giá trị và không được click
        $('.header__search-history').hide();
    }
});

// Sự kiện focus trên input
$('.header__search-input').on('focus', function () {
    // Hiển thị lịch sử tìm kiếm nếu có hoặc không có giá trị
    if ($('.header__search-history-list li').length > 0 && !isOnClick) {
        // Sử dụng setTimeout để tạo độ trễ
        delayTimer = setTimeout(function () {
            $('.header__search-history').show();
        }, 300);
    }

    isOnFocus = true;
});

// Sự kiện blur trên input
$('.header__search-input').on('blur', function () {
    // Ẩn lịch sử tìm kiếm nếu không focus
    if (!isOnFocus) {
        $('.header__search-history').hide();
    }

    // Xóa độ trễ nếu có
    clearTimeout(delayTimer);

    isOnFocus = false;
});

// Ẩn danh sách lịch sử khi click bất kỳ nơi nào trên trang
$(document).on('click', function () {
    $('.header__search-history').hide();
    isOnClick = false;
    isOnFocus = false;
});

// Ngăn chặn sự kiện click trên danh sách lịch sử từ việc ẩn đi
$('.header__search-history').on('click', function (event) {
    event.stopPropagation();
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


