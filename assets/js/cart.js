$(document).ready(function () {

  // Sự kiện click cho nút "Xoá" trong giỏ hàng
    $(".header__cart-list-item").on("click", ".header__cart-item-close", function (e) {
    e.stopPropagation();

    // Get the index of the item to be removed
    var indexToRemove = $(this).closest("li").index();

    // Remove the item from the shoppingCart array
    shoppingCart.splice(indexToRemove, 1);

    // Remove the corresponding HTML element from the cart list
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


var shoppingCart = [];

function addToCart(product) {
    console.log("list product ", product);

    var existingItem = shoppingCart.find(function (item) {
        return item.id === product.id;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        shoppingCart.push({
            id: product.id,
            name: product.name,
            price: product.newPrice,
            quantity: 1
        });
    }

    updateCartUI();
    countCart();
    checkCartStatus();
}

function updateCartUI() {
    var cartListElement = document.getElementById('cart-list');

    var htmls = shoppingCart.map(function (item) {
        return `
                <li class="header__cart-item">
                    <img src="./assets/img/buy/${item.id}.PNG" class="header__cart-item-img">
                    <div class="header__cart-item-info">
                        <div class="header__cart-item-heading">
                            <h3 class="header__cart-item-name">${item.name}</h3>
                            <p class="header__cart-item-price">${formatCurrency((item.price * item.quantity))}K</p>
                        </div>
                        <div class="header__cart-item-body">
                            <p class="header__cart-item-number">x ${item.quantity}</p>
                            <div class="header__cart-item-close">
                                Xoá
                                <i class="fas fa-times"></i>
                            </div>
                        </div>
                    </div>
                </li>`;
    });

    cartListElement.innerHTML = htmls.join('');

}


//// formater
function formatCurrency(value) {
    return value.toLocaleString('vi-VN');
}


// Xly khi không có sản phẩm thì hiển thị giỏ hàng rỗng:
function checkCartStatus() {
    var cartItemCount = $(".header__cart-list-item li").length;

    if (cartItemCount > 0) {
        $(".header__cart").removeClass("header__cart--no-cart").addClass("header__cart--has-cart");
    } else {
        $(".header__cart").removeClass("header__cart--has-cart").addClass("header__cart--no-cart");
    }
}

checkCartStatus();


// Hàm Đếm Số lượng có trong giỏ hàng:
function countCart() {

    var numberCart = document.querySelector('.header__cart-count');

    if (numberCart) {
        var cartItems = document.querySelectorAll('.header__cart-item');
        var count = cartItems.length;

        // Cập nhật số lượng mục trong giỏ hàng lên giao diện người dụng
        numberCart.innerHTML = count.toString();
    }
}

