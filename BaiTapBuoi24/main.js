let cartTotalItems = 0;
const productGrid = document.getElementById('productGrid');
const cartCountElement = document.getElementById('cartCount');
const productCountText = document.getElementById('productCountText');

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        productCountText.innerText = `Hiển thị ${data.length} sản phẩm`;
        renderProducts(data);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu API:", error);
        productGrid.innerHTML = `<p style="color:red">Không thể tải dữ liệu sản phẩm. Vui lòng kiểm tra mạng!</p>`;
    }
}

function renderProducts(products) {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="product-category">${product.category}</span>
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h4 class="product-title">${product.title}</h4>
            <div class="product-rating">
                <i class="fa-solid fa-star"></i> ${product.rating.rate} 
                <span>(${product.rating.count})</span>
            </div>
            <div class="product-footer">
                <span class="product-price">$${product.price}</span>
                <button class="btn-add-cart" onclick="addToCart()" title="Thêm vào giỏ hàng">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

function addToCart() {
    cartTotalItems++;
    cartCountElement.innerText = cartTotalItems;
}

fetchProducts();