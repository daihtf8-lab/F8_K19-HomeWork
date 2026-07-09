import { Product } from "./Product";

export class ProductService {
    public products: Product[] = [];

    public addProduct(product: Product): void {
        this.products.push(product);
    }

    public updateProduct(id: string, data: { name?: string; price?: number; stock?: number }): void {
        const product = this.findById(id);
        if (product) {
            if (data.name !== undefined) product.name = data.name;
            if (data.price !== undefined) product.price = data.price;
            if (data.stock !== undefined) product.stock = data.stock;
        } else {
            console.log("Không tìm thấy sản phẩm cần cập nhật!");
        }
    }

    public deleteProduct(id: string): void {
        this.products = this.products.filter(p => p.id !== id);
    }

    public findById(id: string): Product | undefined {
        return this.products.find(p => p.id === id);
    }

    public findByName(keyword: string): Product[] {
        return this.products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    public getAllProducts(): Product[] {
        return this.products;
    }

    public printProducts(): void {
        console.log("--- DANH SÁCH SẢN PHẨM TRONG KHO ---");
        this.products.forEach(p => console.log(p.toString()));
    }
}