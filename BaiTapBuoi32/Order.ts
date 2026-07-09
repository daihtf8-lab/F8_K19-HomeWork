import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

export class Order {
    public id: string;
    public customer: Customer;
    public items: OrderItem[] = [];
    public createdAt: Date;
    public status: "NEW" | "PAID" | "CANCELLED";

    constructor(id: string, customer: Customer) {
        this.id = id;
        this.customer = customer;
        this.createdAt = new Date();
        this.status = "NEW"; // Mặc định đơn hàng mới tạo có trạng thái là NEW
    }

    public addItem(item: OrderItem): void {
        this.items.push(item);
    }

    public removeItem(productId: string): void {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    public calculateTotal(): number {
        let total = 0;
        this.items.forEach(item => {
            total += item.getTotal();
        });
        return total;
    }

    public printInvoice(): void {
        console.log(`==================================================`);
        console.log(`HÓA ĐƠN CHI TIẾT ĐƠN HÀNG: ${this.id}`);
        console.log(`Ngày tạo: ${this.createdAt.toLocaleString()}`);
        console.log(`Trạng thái: ${this.status}`);
        console.log(`Khách hàng: ${this.customer.name} - SĐT: ${this.customer.phone}`);
        console.log(`---`);
        console.log(`DANH SÁCH MẶT HÀNG ĐÃ ĐẶT:\n`);

        this.items.forEach(item => {
            console.log(`${item.product.name}`);
            console.log(`Số lượng: ${item.quantity}`);
            console.log(`Đơn giá: ${item.price}`);
            console.log(`Thành tiền: ${item.getTotal()}`);
            console.log(`---`);
        });

        console.log(`TỔNG TIỀN PHẢI THANH TOÁN: ${this.calculateTotal()} VNĐ`);
    }
}