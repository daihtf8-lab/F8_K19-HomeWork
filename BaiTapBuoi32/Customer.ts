export class Customer {
    public id: string;
    public name: string;
    public phone: string;
    public address: string;

    constructor(id: string, name: string, phone: string, address: string) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    public updatePhone(phone: string): void {
        this.phone = phone;
    }

    public updateAddress(address: string): void {
        this.address = address;
    }

    public toString(): string {
        return `Khách hàng [ID: ${this.id}, Tên: ${this.name}, SĐT: ${this.phone}, Địa chỉ: ${this.address}]`;
    }
}