const employees = [
    { id: 1, name: "Alice", age: 23, status: 'working' },
    { id: 3, name: "Bob", age: 25, status: 'working' },
    { id: 6, name: "John", age: 27, status: 'working' },
    { id: 8, name: "David", age: 23, status: 'quit_job' },
    { id: 10, name: "Eve", age: 20, status: 'working' },
];


const products = [
    { id: 1, name: "Phone", price: 1200 },
    { id: 2, name: "Laptop", price: 3000  },
    { id: 3, name: "Tab", price: 2000  },
    { id: 4, name: "PC", price: 800  },
    { id: 5, name: "Monitor", price: 1500  },
]


const orders = [
    { id: 1, employeeId: 1, productId: 4, quantity: 1 },
    { id: 2, employeeId: 3, productId: 2, quantity: 4 },
    { id: 3, employeeId: 1, productId: 5, quantity: 1 },
    { id: 4, employeeId: 6, productId: 1, quantity: 2 },
    { id: 5, employeeId: 3, productId: 5, quantity: 3 },
    { id: 6, employeeId: 8, productId: 1, quantity: 1 },
    { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];

// Convert Array to Object for O(1) lookup
const createLookupMap = (inputArray) => {
    return inputArray.reduce((generatedMap, processedItem) => {
        generatedMap[processedItem.id] = processedItem;
        return generatedMap;
    }, {});
};

const mappedProducts = createLookupMap(products);
const mappedEmployees = createLookupMap(employees);

// Process all orders in a single pass for optimal performance
const calculateOverallStatistics = (inputOrders, inputProductsMap) => {
    const analyzedProductStats = {};
    const analyzedEmployeeStats = {};

    for (const currentOrder of inputOrders) {
        const targetProduct = inputProductsMap[currentOrder.productId];
        const currentRevenue = targetProduct.price * currentOrder.quantity;

        // 1. Aggregate stats for Products
        if (!analyzedProductStats[currentOrder.productId]) {
            analyzedProductStats[currentOrder.productId] = { totalQuantity: 0, totalRevenue: 0 };
        }
        analyzedProductStats[currentOrder.productId].totalQuantity += currentOrder.quantity;
        analyzedProductStats[currentOrder.productId].totalRevenue += currentRevenue;

        // 2. Aggregate stats for Employees
        if (!analyzedEmployeeStats[currentOrder.employeeId]) {
            analyzedEmployeeStats[currentOrder.employeeId] = {
                totalQuantity: 0,
                totalRevenue: 0,
                specificRevenues: {} // Track revenue per product for Task 8
            };
        }
        analyzedEmployeeStats[currentOrder.employeeId].totalQuantity += currentOrder.quantity;
        analyzedEmployeeStats[currentOrder.employeeId].totalRevenue += currentRevenue;

        // Track employee's detailed product sales
        if (!analyzedEmployeeStats[currentOrder.employeeId].specificRevenues[currentOrder.productId]) {
            analyzedEmployeeStats[currentOrder.employeeId].specificRevenues[currentOrder.productId] = 0;
        }
        analyzedEmployeeStats[currentOrder.employeeId].specificRevenues[currentOrder.productId] += currentRevenue;
    }

    return { analyzedProductStats, analyzedEmployeeStats };
};

// Execute pre-processing once
const overallStatistics = calculateOverallStatistics(orders, mappedProducts);
const globalProductStats = overallStatistics.analyzedProductStats;
const globalEmployeeStats = overallStatistics.analyzedEmployeeStats;

// Bai 1: Lấy danh sách nhân viên đang làm việc
const findWorkingEmployees = (inputEmployees) => {
    const activeEmployees = inputEmployees.filter(processedEmployee => processedEmployee.status === 'working');
    return activeEmployees;
};

// Bai 2: Lấy ra nhân viên lớn tuổi nhất
const findOldestEmployee = (inputEmployees) => {
    const oldestEmployee = inputEmployees.reduce((previousOldest, processedEmployee) =>
        processedEmployee.age > previousOldest.age ? processedEmployee : previousOldest
    );
    return oldestEmployee;
};

// Bai 3: Lấy ra sản phẩm giá rẻ nhất
const findCheapestProduct = (inputProducts) => {
    const cheapestProduct = inputProducts.reduce((previousCheapest, processedProduct) =>
        processedProduct.price < previousCheapest.price ? processedProduct : previousCheapest
    );
    return cheapestProduct;
};

// Bai 4: Tìm ra sản phẩm bán chạy nhất (số lượng)
const findBestSellingProduct = (analyzedProductStats, mappedProducts) => {
    let highestQuantity = 0;
    let bestProduct = null;

    for (const stringId in analyzedProductStats) {
        const currentStats = analyzedProductStats[stringId];
        if (currentStats.totalQuantity > highestQuantity) {
            highestQuantity = currentStats.totalQuantity;
            bestProduct = mappedProducts[stringId];
        }
    }
    return { ...bestProduct, totalSold: highestQuantity };
};

// Bai 5: Tìm ra sản phẩm doanh thu cao nhất
const findHighestRevenueProduct = (analyzedProductStats, mappedProducts) => {
    let highestRevenue = 0;
    let topProduct = null;

    for (const stringId in analyzedProductStats) {
        const currentStats = analyzedProductStats[stringId];
        if (currentStats.totalRevenue > highestRevenue) {
            highestRevenue = currentStats.totalRevenue;
            topProduct = mappedProducts[stringId];
        }
    }
    return { ...topProduct, generatedRevenue: highestRevenue };
};

// Bai 6: Tìm ra nhân viên bán nhiều hàng nhất (số lượng)
const findTopSellingEmployee = (analyzedEmployeeStats, mappedEmployees) => {
    let highestQuantity = 0;
    let topEmployee = null;

    for (const stringId in analyzedEmployeeStats) {
        const currentStats = analyzedEmployeeStats[stringId];
        if (currentStats.totalQuantity > highestQuantity) {
            highestQuantity = currentStats.totalQuantity;
            topEmployee = mappedEmployees[stringId];
        }
    }
    return { ...topEmployee, totalSold: highestQuantity };
};

// Bai 7: Tìm ra nhân viên có doanh thu cao nhất
const findTopRevenueEmployee = (analyzedEmployeeStats, mappedEmployees) => {
    let highestRevenue = 0;
    let topEmployee = null;

    for (const stringId in analyzedEmployeeStats) {
        const currentStats = analyzedEmployeeStats[stringId];
        if (currentStats.totalRevenue > highestRevenue) {
            highestRevenue = currentStats.totalRevenue;
            topEmployee = mappedEmployees[stringId];
        }
    }
    return { ...topEmployee, generatedRevenue: highestRevenue };
};

// Bai 8: Tìm ra sản phẩm mang lại doanh thu cao nhất CHO MỖI nhân viên
const findTopProductPerEmployee = (analyzedEmployeeStats, mappedEmployees, mappedProducts) => {
    const finalResults = [];

    for (const stringId in analyzedEmployeeStats) {
        const currentEmployee = mappedEmployees[stringId];
        const specificRevenues = analyzedEmployeeStats[stringId].specificRevenues;

        let highestRevenue = 0;
        let bestProductId = null;

        for (const productId in specificRevenues) {
            if (specificRevenues[productId] > highestRevenue) {
                highestRevenue = specificRevenues[productId];
                bestProductId = productId;
            }
        }

        const bestProduct = mappedProducts[bestProductId];
        finalResults.push({
            employeeName: currentEmployee.name,
            topProductName: bestProduct ? bestProduct.name : 'None',
            generatedRevenue: highestRevenue
        });
    }
    return finalResults;
};

// Bai 9: Tìm hoa hồng 3% cho mỗi nhân viên
const calculateCommissions = (analyzedEmployeeStats, mappedEmployees) => {
    const calculatedCommissions = [];

    for (const stringId in analyzedEmployeeStats) {
        const currentEmployee = mappedEmployees[stringId];
        const currentRevenue = analyzedEmployeeStats[stringId].totalRevenue;
        const earnedCommission = currentRevenue * 0.03;

        calculatedCommissions.push({
            employeeName: currentEmployee.name,
            earnedCommission: earnedCommission
        });
    }
    return calculatedCommissions;
};

// Bai 10: Sắp xếp nhân viên giảm dần theo doanh thu
const sortEmployeesByRevenue = (analyzedEmployeeStats, mappedEmployees) => {
    const formattedEmployees = [];

    for (const stringId in analyzedEmployeeStats) {
        const currentEmployee = mappedEmployees[stringId];
        const currentRevenue = analyzedEmployeeStats[stringId].totalRevenue;

        formattedEmployees.push({
            ...currentEmployee,
            generatedRevenue: currentRevenue
        });
    }

    // Sort descending using standard logic (B - A)
    const sortedEmployees = formattedEmployees.sort((firstItem, secondItem) =>
        secondItem.generatedRevenue - firstItem.generatedRevenue
    );
    return sortedEmployees;
};

console.log("BÀI 1: Danh sách nhân viên đang làm việc");
console.log(findWorkingEmployees(employees));

console.log("\nBÀI 2: Nhân viên lớn tuổi nhất");
console.log(findOldestEmployee(employees));

console.log("\nBÀI 3: Sản phẩm giá rẻ nhất");
console.log(findCheapestProduct(products));

console.log("\nBÀI 4: Sản phẩm bán chạy nhất (Số lượng)");
console.log(findBestSellingProduct(globalProductStats, mappedProducts));

console.log("\nBÀI 5: Sản phẩm có doanh thu cao nhất");
console.log(findHighestRevenueProduct(globalProductStats, mappedProducts));

console.log("\nBÀI 6: Nhân viên bán nhiều hàng nhất (Số lượng)");
console.log(findTopSellingEmployee(globalEmployeeStats, mappedEmployees));

console.log("\nBÀI 7: Nhân viên có doanh thu cao nhất");
console.log(findTopRevenueEmployee(globalEmployeeStats, mappedEmployees));

console.log("\nBÀI 8: Sản phẩm mang lại doanh thu cao nhất của từng nhân viên");
console.log(findTopProductPerEmployee(globalEmployeeStats, mappedEmployees, mappedProducts));

console.log("\nBÀI 9: Tiền hoa hồng (3%) của mỗi nhân viên");
console.log(calculateCommissions(globalEmployeeStats, mappedEmployees));

console.log("\nBÀI 10: Danh sách nhân viên sắp xếp giảm dần theo doanh thu");
console.log(sortEmployeesByRevenue(globalEmployeeStats, mappedEmployees));