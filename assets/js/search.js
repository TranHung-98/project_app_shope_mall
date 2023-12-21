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


function searchProductList(keyWord) {
  $.ajax({
    url: 'https://raw.githubusercontent.com/TranHung-98/UpData_Product_EveryOne/main/data_product.json',
    method: 'GET',
    dataType: 'json',
    success: function (products) {
      const filteredList = products.filter(product => {
        // Adjust the condition based on your specific search requirements
        return product.name.toLowerCase().includes(keyWord.toLowerCase());
      });

      if (filteredList.length === 0) {
        // If no products are found, display a message
        $('#list-product').addClass("result").text(`Không tìm thấy sản phẩm "${keyWord}" bạn tìm kiếm!`);
      } else {
        // If products are found, render the filtered list
        // Remove the "result" class and set the text to an empty string
        $('#list-product').removeClass("result").text("");
        renderItem(filteredList);
      }

      responsive();
      // handlePagination();
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    }
  });
}



function filterCategories() {
  $.ajax({
    url: 'https://raw.githubusercontent.com/TranHung-98/UpData_Product_EveryOne/main/data_product.json',
    method: 'GET',
    dataType: 'json',
    success: function (products) {

      var categories = {
        'Network_devices': [],
        'Companies_USB': [],
        'Companies_Camera': [],
        'Companies_Laptop': [],
        // Add more categories as needed
      };

      // Categorize products
       var category = products.forEach(product => {
        // You can customize this condition based on your product data
        if (product.name.includes('USB')) {
          categories['Companies_USB'].push(product);
        } else if (product.name.includes('Camera')) {
          categories['Companies_Camera'].push(product);
        }else if (product.name.includes('Laptop')) {
          categories['Companies_Laptop'].push(product);
        }
        // Add more conditions for other categories
      });

      // Render the filtered list
      renderItem();

      // Perform other actions like updating pagination or handling responsiveness
      responsive();
      // handlePagination();
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    }
  });
}
