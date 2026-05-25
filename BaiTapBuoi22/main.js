const invoiceData = {
    meta: {
        invoiceNo: "WM-2026-052101",
        saleDate: "2026/05/21",
        currency: "VND",
        paymentMethod: "Cash"
    },
    seller: {
        name: "WinMark 2 Hai Bà Trưng",
        address: "2 Bà Trưng - Hoàn Kiếm - HN",
        phone: "012345678",
        representative: "Đại diện WinMark"
    },
    customer: {
        name: "Nguyễn Văn A",
        age: 20,
        address: "Hà Đông, Hà Nội"
    },
    items: [
        { no: 1, name: "Áo thun", size: "XL", quantity: 1, price: 200000 },
        { no: 2, name: "Áo thun", size: "XL", quantity: 1, price: 200000 }
    ],
    promotion: {
        description: "Khuyến mãi 50% dành cho Khách hàng thân thiết",
        discountPercent: 50
    }
};

// format currency
const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN') + ' đ';
};

// data to dom
const renderInvoice = () => {
    // render order info
    document.getElementById('invoice-no').textContent = invoiceData.meta.invoiceNo;
    document.getElementById('sale-date').textContent = invoiceData.meta.saleDate;

    // render seller info
    document.getElementById('seller-name').textContent = invoiceData.seller.name;
    document.getElementById('seller-address').textContent = invoiceData.seller.address;
    document.getElementById('seller-phone').textContent = invoiceData.seller.phone;

    // render buyer info
    document.getElementById('customer-name').textContent = invoiceData.customer.name;
    document.getElementById('customer-age').textContent = invoiceData.customer.age;
    document.getElementById('customer-address').textContent = invoiceData.customer.address;

    // render items and money
    const tbody = document.getElementById('invoice-items');
    let subtotal = 0;

    invoiceData.items.forEach(item => {
        const amount = item.price * item.quantity;
        subtotal += amount;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="color: #9ca3af;">${item.no}</td>
            <td>${item.name}</td>
            <td class="center" style="color: #6b7280;">${item.size}</td>
            <td class="center">${item.quantity}</td>
            <td class="right">${formatCurrency(item.price)}</td>
            <td class="right">${formatCurrency(amount)}</td>
        `;
        tbody.appendChild(tr);
    });

    // render deal info
    document.getElementById('promo-desc').textContent = invoiceData.promotion.description;

    const discount = (subtotal * invoiceData.promotion.discountPercent) / 100;
    const total = subtotal - discount;

    document.getElementById('subtotal-amount').textContent = formatCurrency(subtotal);
    document.getElementById('discount-amount').textContent = '-' + formatCurrency(discount);
    document.getElementById('total-amount').textContent = formatCurrency(total);
};

document.addEventListener('DOMContentLoaded', renderInvoice);