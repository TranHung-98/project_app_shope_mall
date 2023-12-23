// 1. Lấy Dữ Liệu và Add Cart:
var cartProductList = [];

// Gọi function show  display:
getDataProduct();


function getDataProduct() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/TranHung-98/UpData_Product_EveryOne/main/data_product.json',
        method: 'GET',
        dataType: 'json',
        success: function (listProduct) {

            cartProductList = listProduct;
            // Set up event listeners for filter buttons
            setupFilterButtons();
            // Render initial data
            renderItem(cartProductList);
            responsive();
        }
    });
}

// Hàm xáo trộn dữ liệu
function shuffle() {
    const shuffledList = cartProductList.slice(0, 25).sort(() => Math.random() - 0.5);
    renderItem(shuffledList);
}

// Hàm xắp xếp dữ liệu theo giá tiền up and down
function sortDataPriceUp() {
    const sortedList = cartProductList.slice(0, 25).sort((a, b) => parseFloat(a.newPrice) - parseFloat(b.newPrice));
    renderItem(sortedList);
}

function sortDataPriceDown() {
    const sortedList = cartProductList.slice(0, 25).sort((a, b) => parseFloat(b.newPrice) - parseFloat(a.newPrice));
    renderItem(sortedList);
}
//End hàm xắp xếp theo giá up and down

// Hàm xắp xếp theo bán chạy
function sortBySelling() {
    const sortedList = cartProductList.slice(0, 25).sort((a, b) => parseFloat(b.saled) - parseFloat(a.saled));
    renderItem(sortedList);
}

// Hàm xắp cếp theo ngày mới nhất và  new
function sortByDate() {
    const sortedList = cartProductList.slice(0, 25).sort((a, b) => {
        // Assuming 'date' is a string in the format 'DD-MM-YYYY'
        const [dayA, monthA, yearA] = a.date.split('-').map(Number);
        const [dayB, monthB, yearB] = b.date.split('-').map(Number);

        // Convert date components to Date objects for comparison
        const dateA = new Date(yearA, monthA - 1, dayA); // Month is 0-indexed in Date
        const dateB = new Date(yearB, monthB - 1, dayB);

        // Compare the dates in descending order
        return dateB - dateA;
    });

    renderItem(sortedList);
}

//Hàm search
function searchProductList(keyWord) {
    const filteredList = cartProductList.filter(product => {
        return product.name.toLowerCase().includes(keyWord.toLowerCase());
    });
    if (filteredList.length === 0) {
        $('#list-product').addClass("result").text(`Không tìm thấy sản phẩm "${keyWord}" bạn tìm kiếm!`);
    } else {
        $('#list-product').removeClass("result").text("");
        renderItem(filteredList);
    }
    responsive();
}


// 3. Hiển Thị Sản Phẩm:main product
function renderItem(productList) {
    var listProduct = document.getElementById('list-product');

    if (!Array.isArray(productList)) {
        console.error('Error: Data is not in the expected format.');
        return;
    }
    var htmls = productList.slice(0, 25).map(function (product, index) {
        return `
        <div data="${index} " class="col l-2-4 m-3 c-6 home-product-item">
        <a class="home-product-item-link" href="#">
            <div class="home-product-item__img" style="background-image: url(./assets/img/home/${product.id}.PNG);">
            <span class="home-product-item__img-text-none" id="text_img">${product.id}</span>
            </div>
            <div class="home-product-item__info">
                <h4 class="home-product-item__name">${product.name}</h4>
                <div class="home-product-item__price">
                    <p class="home-product-item__price-old">${product.oldPrice}đ</p>
                    <p class="home-product-item__price-new">${product.newPrice}đ</p>
                    <i class="home-product-item__ship fas fa-shipping-fast"></i>
                </div>
                <div class="home-product-item__footer">
                    <div class="home-product-item__save">
                        <input type="checkbox" id="heart-save-${product.id}">
                        <label for="heart-save-${product.id}" class="far fa-heart"></label>
                    </div>
                    <div class="home-product-item__rating-star">
                        <i class="star-checked far fa-star"></i>
                        <i class="star-checked far fa-star"></i>
                        <i class="star-checked far fa-star"></i>
                        <i class="star-checked far fa-star"></i>
                        <i class="star-uncheck far fa-star"></i>
                    </div>
                    <div class="home-product-item__saled">Đã bán ${product.saled}</div>
                </div>
                <div class="home-product-item__origin">${product.origin}</div>
                <div class="home-product-item__favourite">
                    Yêu thích
                </div>
                <div class="home-product-item__sale-off">
                    <div class="home-product-item__sale-off-value">${product.saleOff}%</div>
                    <div class="home-product-item__sale-off-label">GIẢM</div>
                </div>
            </div>
            <button class="home-product-item-footer" id="add-to-cart-${product.id}" >Thêm vào giỏ hàng</button>
        </a>
    </div>`;
    })

    listProduct.innerHTML = htmls.join('');

    productList.forEach(function (product) {
        var addToCartButton = document.getElementById(`add-to-cart-${product.id}`);
        $(addToCartButton).on('click', function () {
            addToCart(product);
        });
    });
}

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


// 4. Điều Chỉnh Giao Diện Theo Kích Thước Màn Hình:
function responsive() {
    var listItem = document.querySelectorAll('.home-product-item');
    var bodyWidth = document.body.clientWidth;
    var listItemLength = listItem.length;

    if (bodyWidth < 740) {
        for (var i = listItemLength - 1; i >= Math.floor(listItemLength / 2) * 2; i--) {
            listItem[i].remove();
        }
    } else if (bodyWidth < 1024) {
        for (var i = listItemLength - 1; i >= Math.floor(listItemLength / 4) * 4; i--) {
            listItem[i].remove();
        }
    }
}

