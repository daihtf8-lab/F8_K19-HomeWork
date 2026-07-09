import { Product } from "./Product";

export class OrderItem {
    public product: Product;
    public quantity: number;
    public price: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
        this.price = product.price; // Chốt giá bán tại thời điểm đặt hàng
    }

    public getTotal(): number {
        return this.price * this.quantity;
    }
}