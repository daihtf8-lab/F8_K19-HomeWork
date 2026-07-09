import { Product } from "./Product";
import { ProductService } from "./ProductService";
import { Customer } from "./Customer";
import { CustomerService } from "./CustomerService";
import { OrderService } from "./OrderService";

const productService = new ProductService();
const customerService = new CustomerService();
const orderService = new OrderService(productService);

const p1 = new Product("PROD01", "iPhone 15 Pro Max", 35000000, 10);
const p2 = new Product("PROD02", "MacBook Pro M3", 45000000, 5);
productService.addProduct(p1);
productService.addProduct(p2);

productService.printProducts();

const customer = new Customer("CUST01", "Trần Văn B", "0912345678", "Cầu Giấy, Hà Nội");
customerService.addCustomer(customer);

console.log("\n--- BẮT ĐẦU ĐẶT HÀNG ---");
const myOrder = orderService.createOrder(customer);

orderService.addProduct(myOrder.id, "PROD01", 2);
orderService.addProduct(myOrder.id, "PROD02", 1);

myOrder.printInvoice();

productService.printProducts();

console.log("\n--- TIẾN HÀNH THANH TOÁN ĐƠN ---");
orderService.checkout(myOrder.id);
myOrder.printInvoice();