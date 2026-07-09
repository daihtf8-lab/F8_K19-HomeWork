import { Order } from "./Order";
import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";
import { ProductService } from "./ProductService";

export class OrderService {
    public orders: Order[] = [];
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public createOrder(customer: Customer): Order {
        const orderId = "ORD-" + Math.floor(Math.random() * 10000);
        const newOrder = new Order(orderId, customer);
        this.orders.push(newOrder);
        return newOrder;
    }

    public addProduct(orderId: string, productId: string, quantity: number): void {
        const order = this.findOrder(orderId);
        const product = this.productService.findById(productId);

        if (!order) {
            console.log("Không tìm thấy đơn hàng!");
            return;
        }
        if (!product) {
            console.log("Không tìm thấy sản phẩm!");
            return;
        }
        if (order.status !== "NEW") {
            console.log("Đơn hàng không còn ở trạng thái NEW, không thể thêm sản phẩm!");
            return;
        }
        if (product.stock < quantity) {
            console.log(`Kho không đủ sản phẩm ${product.name} (Hiện còn: ${product.stock})`);
            return;
        }

        product.decreaseStock(quantity);

        const orderItem = new OrderItem(product, quantity);
        order.addItem(orderItem);
    }

    public removeProduct(orderId: string, productId: string): void {
        const order = this.findOrder(orderId);
        if (!order || order.status !== "NEW") return;

        const item = order.items.find(i => i.product.id === productId);
        if (item) {
            item.product.increaseStock(item.quantity);
            order.removeItem(productId);
        }
    }

    public checkout(orderId: string): void {
        const order = this.findOrder(orderId);
        if (order && order.status === "NEW") {
            order.status = "PAID";
            console.log(`Thanh toán đơn hàng ${orderId} thành công.`);
        }
    }

    public cancelOrder(orderId: string): void {
        const order = this.findOrder(orderId);
        if (order && order.status === "NEW") {
            order.status = "CANCELLED";
            order.items.forEach(item => {
                item.product.increaseStock(item.quantity);
            });
            console.log(`Đã hủy đơn hàng ${orderId} thành công.`);
        }
    }

    public findOrder(orderId: string): Order | undefined {
        return this.orders.find(o => o.id === orderId);
    }

    public getOrders(): Order[] {
        return this.orders;
    }

    public printOrders(): void {
        this.orders.forEach(o => o.printInvoice());
    }
}