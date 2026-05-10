const products = [
    { id: 1, name: 'iPhone', price: 2000 },
    { id: 2, name: 'Samsung', price: 1500 },
    { id: 3, name: 'Xiaomi', price: 1000 },
    { id: 4, name: 'Oppo', price: 1200 }
];

const orders = [
    { id: 1, items: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 1 }] },
    { id: 2, items: [{ productId: 1, quantity: 1 }, { productId: 3, quantity: 3 }] },
    { id: 3, items: [{ productId: 2, quantity: 2 }, { productId: 4, quantity: 1 }] }
];

function timSanPhamDoanhThuCaoNhat() {
    let maxRevenue = 0;
    let topProduct = null;

    for (let i = 0; i < products.length; i++) {
        let currentProduct = products[i];
        let totalQuantity = 0;

        for (let j = 0; j < orders.length; j++) {
            let currentOrder = orders[j];

            for (let k = 0; k < currentOrder.items.length; k++) {
                let item = currentOrder.items[k];

                if (item.productId === currentProduct.id) {
                    totalQuantity += item.quantity;
                }
            }
        }

        let currentRevenue = totalQuantity * currentProduct.price;

        if (currentRevenue > maxRevenue) {
            maxRevenue = currentRevenue;
            topProduct = {
                name: currentProduct.name,
                totalSold: totalQuantity,
                totalRevenue: currentRevenue
            };
        }
    }

    return topProduct;
}

const ketQua = timSanPhamDoanhThuCaoNhat();
console.log(ketQua);