$(document).ready(function () {

  $(document).on('click', '#btn-search', function (event) {
    event.stopPropagation();
    var keyWord = $('#search').val();
    searchProductList(keyWord);
  });

  $('input[type="search"]').on('keypress', function (e) {
    e.stopPropagation();
    if (e.which == 13) {
      var keyWord = $('#search').val();
      searchProductList(keyWord);
    }
  });
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



function filterCategories(keyWord) {
  $.ajax({
    url: 'https://raw.githubusercontent.com/TranHung-98/UpData_Product_EveryOne/main/data_product.json',
    method: 'GET',
    dataType: 'json',
    success: function (list) {

      var categories = {
        'Electronic_devices': [],
        'Network_devices': [],
        'Companies_USB': [],
        'Companies_Camera': [],
        'Companies_Laptop': [],
        'Equipment_Cap': [],
        'Equipped_Power': [],
        'Equipped_PC': [],
        'CellPhone': [],
        'Display_PC': [],
        'Mỹ phẩm Cao Cấp': [],
        'Mỹ Phẩm Trung Cấp': [],
        'Hãng Mỹ Phẩm': [],
        'Dụng Cụ Trang điểm': [],
        'Thiết bị âm thanh': []
        // Add more categories as needed
      };

      // Categorize products
      products.forEach(product => {
        // You can customize this condition based on your product data
        if (product.name.includes('USB')) {
          categories['Companies_USB'].push(product);
        } else if (product.name.includes('Camera')) {
          categories['Companies_Camera'].push(product);
        }else if (product.name.includes('Camera')) {
          categories['Companies_Camera'].push(product);
        }
        // Add more conditions for other categories
      });

      // Example: Display products in the 'Các hãng USB' category
      console.log(categories['Các hãng USB']);


      // Render the filtered list
      renderItem(filteredList);

      // Perform other actions like updating pagination or handling responsiveness
      responsive();
      // handlePagination();
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    }
  });
}
