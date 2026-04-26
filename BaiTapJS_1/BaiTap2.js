function getElectricityBill(kwh) {
    // (B) Tính từ + Danh từ: Lưu tổng số tiền
    let totalBill = 0;

    if (kwh <= 0) {
        return 0;
    }

    if (kwh <= 50) {
        totalBill = kwh * 1678;
    } else if (kwh <= 100) {
        totalBill = (50 * 1678) + ((kwh - 50) * 1734);
    } else if (kwh <= 200) {
        totalBill = (50 * 1678) + (50 * 1734) + ((kwh - 100) * 2014);
    } else if (kwh <= 300) {
        totalBill = (50 * 1678) + (50 * 1734) + (100 * 2014) + ((kwh - 200) * 2536);
    } else if (kwh <= 400) {
        totalBill = (50 * 1678) + (50 * 1734) + (100 * 2014) + (100 * 2536) + ((kwh - 300) * 2834);
    }
    else {
        totalBill = (50 * 1678) + (50 * 1734) + (100 * 2014) + (100 * 2536) + (100 * 2834) + ((kwh - 400) * 2927);
    }
    return totalBill;
}

// TEST THỬ KẾT QUẢ

console.log(getElectricityBill(70));

console.log(getElectricityBill(120));