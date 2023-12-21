// 1. Lấy Dữ Liệu và Add Cart:
var cartItems = [];

document.addEventListener('DOMContentLoaded', function () {
    getDataProduct();
});

function getDataProduct() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/TranHung-98/UpData_Product_EveryOne/main/data_product.json',
        method: 'GET',
        dataType: 'json',
        success: function (listProduct) {
            renderItem(listProduct);
            responsive();
            // handlePagination();
        }
    })

    function renderItem(products) {
        var listProductElement = document.getElementById('list-product');
        var htmls = products.map(function (product, index) {
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
                <button class="home-product-item-footer"  id="add-to-cart-${product.id}">Thêm vào giỏ hàng</button>
            </a>
        </div>`;
        })
        listProductElement.innerHTML = htmls.join('');

        // Adding click event listeners to "Add to Cart" buttons
        products.forEach(function (product) {
            var addToCartButton = document.getElementById(`add-to-cart-${product.id}`);
            addToCartButton.addEventListener('click', function () {
                addToCart(product);
            });
        });

    }
}


function addToCart(product) {

    // cartItems.push(product);
    var existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        if (product && product.id) {
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.newPrice,
                quantity: 1
            });
        }
    }
    updateCartUI();
    countCart();
    checkCartStatus();
}

function updateCartUI() {
    var cartListElement = document.getElementById('cart-list');

    if (cartListElement) {

        var htmls = cartItems.map(function (item) {
            return `
                <li class="header__cart-item">
                    <img src="./assets/img/buy/${item.id}.PNG" class="header__cart-item-img">
                    <div class="header__cart-item-info">
                        <div class="header__cart-item-heading">
                            <h3 class="header__cart-item-name">${item.name}</h3>
                            <p class="header__cart-item-price">${formatCurrency(item.price * item.quantity)}.000đ</p>
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

        $(cartListElement).empty().append(htmls.join(''));
    }
}


function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCartUI();
}

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


function shuffer() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/TranHung-98/UpData_Product_EveryOne/main/data_product.json',
        method: 'GET',
        dataType: 'json',
        success: function (list) {
            list = list.sort(() => Math.random() - 0.5);
            renderItem(list);
            responsive();
            // handlePagination();
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
}

function sortDataPriceUp() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/TranHung-98/UpData_Product_EveryOne/main/data_product.json',
        method: 'GET',
        dataType: 'json',
        success: function (list) {
            list = list.sort((a, b) => parseFloat(a.newPrice) - parseFloat(b.newPrice));
            renderItem(list);
            responsive();
            // handlePagination();
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
}


function sortDataPriceDown() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/TranHung-98/UpData_Product_EveryOne/main/data_product.json',
        method: 'GET',
        dataType: 'json',
        success: function (list) {
            list = list.sort((a, b) => parseFloat(b.newPrice) - parseFloat(a.newPrice));
            renderItem(list);
            responsive();
            // handlePagination();
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
}


function selling() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/TranHung-98/UpData_Product_EveryOne/main/data_product.json',
        method: 'GET',
        dataType: 'json',
        success: function (list) {
            list = list.sort((a, b) => parseFloat(b.saled) - parseFloat(a.saled));
            renderItem(list);
            responsive();
            // handlePagination();
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
}


// 3. Hiển Thị Sản Phẩm:main product
function renderItem(productsLists, items_per_page) {
    var listProduct = document.getElementById('list-product');

    if (!Array.isArray(productsLists)) {
        console.error('Error: Data is not in the expected format.');
        return;
    }
    var htmls = productsLists.slice(0, items_per_page).map(function (productsList, index) {
        return `
        <div data="${index} " class="col l-2-4 m-3 c-6 home-product-item">
        <a class="home-product-item-link" href="#">
            <div class="home-product-item__img" style="background-image: url(./assets/img/home/${productsList.id}.PNG);">
            <span class="home-product-item__img-text-none" id="text_img">${productsList.id}</span>
            </div>
            <div class="home-product-item__info">
                <h4 class="home-product-item__name">${productsList.name}</h4>
                <div class="home-product-item__price">
                    <p class="home-product-item__price-old">${productsList.oldPrice}đ</p>
                    <p class="home-product-item__price-new">${productsList.newPrice}đ</p>
                    <i class="home-product-item__ship fas fa-shipping-fast"></i>
                </div>
                <div class="home-product-item__footer">
                    <div class="home-product-item__save">
                        <input type="checkbox" id="heart-save-${productsList.id}">
                        <label for="heart-save-${productsList.id}" class="far fa-heart"></label>
                    </div>
                    <div class="home-product-item__rating-star">
                        <i class="star-checked far fa-star"></i>
                        <i class="star-checked far fa-star"></i>
                        <i class="star-checked far fa-star"></i>
                        <i class="star-checked far fa-star"></i>
                        <i class="star-uncheck far fa-star"></i>
                    </div>
                    <div class="home-product-item__saled">Đã bán ${productsList.saled}</div>
                </div>
                <div class="home-product-item__origin">${productsList.origin}</div>
                <div class="home-product-item__favourite">
                    Yêu thích
                </div>
                <div class="home-product-item__sale-off">
                    <div class="home-product-item__sale-off-value">${productsList.saleOff}%</div>
                    <div class="home-product-item__sale-off-label">GIẢM</div>
                </div>
            </div>
            <button class="home-product-item-footer" id="add-to-cart${productsList.id}" >Thêm vào giỏ hàng</button>
        </a>
    </div>`;
    })
    listProduct.innerHTML = htmls.join('');
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

