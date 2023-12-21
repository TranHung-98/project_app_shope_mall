$(document).ready(function () {


  /// Xly giỏ hàng

  // // Sự kiện click cho nút "Xoá" trong giỏ hàng
  $(".header__cart-list-item").on("click", ".header__cart-item-close", function (e) {
    e.stopPropagation();

    // Xoá sản phẩm khỏi giỏ hàng
    $(this).closest("li").remove();

    // Check and update the cart status
    checkCartStatus();

    // Count the number of items in the cart
    countCart();
  });



  // Gọi hàm kiểm tra trạng thái giỏ hàng khi trang tải
  // checkCartStatus();

  // // Hàm tính toán tổng giá trị giỏ hàng
  // function calculateTotalPrice() {
  //   var totalPrice = 0;

  //   // Lặp qua từng sản phẩm trong giỏ hàng
  //   $(".header__cart-item").each(function () {
  //     // Lấy giá trị và số lượng từ mỗi sản phẩm
  //     var price = parseFloat($(this).find(".header__cart-item-price").text().replace('đ', '').replace('.', '').replace(',', ''));
  //     var quantity = parseInt($(this).find(".header__cart-item-number").text().replace('x ', ''));

  //     // Tính toán tổng giá trị giỏ hàng
  //     totalPrice += price * quantity;
  //   });

  //   // Hiển thị tổng giá trị
  //   $(".header__cart-total-price").text(formatCurrencyTotal(totalPrice) + 'đ');
  // }

  // // Hàm định dạng số tiền thành định dạng tiền tệ
  // function formatCurrencyTotal(value) {
  //   return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  // }
},);



