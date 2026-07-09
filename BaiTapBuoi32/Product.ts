export class Product {
    public id: string;
    public name: string;
    public price: number;
    public stock: number;

    constructor(id: string, name: string, price: number, stock: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    public increaseStock(quantity: number): void {
        this.stock += quantity;
    }

    public decreaseStock(quantity: number): void {
        if (this.stock >= quantity) {
            this.stock -= quantity;
        } else {
            console.log("Không đủ số lượng hàng trong kho!");
        }
    }

    public toString(): string {
        return `Sản phẩm [ID: ${this.id}, Tên: ${this.name}, Giá: ${this.price}, Kho: ${this.stock}]`;
    }
}