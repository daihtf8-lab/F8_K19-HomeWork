import { Product } from "./Product";
import { ProductService } from "./ProductService";
import { Customer } from "./Customer";
import { CustomerService } from "./CustomerService";
import { OrderService } from "./OrderService";

// Khởi tạo các Service tổng
const productService = new ProductService();
const customerService = new CustomerService();
const orderService = new OrderService(productService);

// 1. Nhập sản phẩm vào kho hàng
const p1 = new Product("PROD01", "iPhone 15 Pro Max", 35000000, 10);
const p2 = new Product("PROD02", "MacBook Pro M3", 45000000, 5);
productService.addProduct(p1);
productService.addProduct(p2);

// Xem kho hàng ban đầu
productService.printProducts();

// 2. Đăng ký một khách hàng
const customer = new Customer("CUST01", "Trần Văn B", "0912345678", "Cầu Giấy, Hà Nội");
customerService.addCustomer(customer);

// 3. Khách hàng tiến hành mua hàng
console.log("\n--- BẮT ĐẦU ĐẶT HÀNG ---");
const myOrder = orderService.createOrder(customer);

// Thêm sản phẩm vào giỏ đơn hàng
orderService.addProduct(myOrder.id, "PROD01", 2); // Mua 2 cái iPhone
orderService.addProduct(myOrder.id, "PROD02", 1); // Mua 1 cái MacBook

// In thử hóa đơn tạm tính (Trạng thái: NEW)
myOrder.printInvoice();

// Kiểm tra lại xem số lượng tồn kho sản phẩm tự động trừ chưa
productService.printProducts();

// 4. Thanh toán hóa đơn (Chuyển trạng thái PAID)
console.log("\n--- TIẾN HÀNH THANH TOÁN ĐƠN ---");
orderService.checkout(myOrder.id);
myOrder.printInvoice();