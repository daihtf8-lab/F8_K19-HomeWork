import { Customer } from "./Customer";

export class CustomerService {
    public customers: Customer[] = [];

    public addCustomer(customer: Customer): void {
        this.customers.push(customer);
    }

    public updateCustomer(id: string, data: { name?: string; phone?: string; address?: string }): void {
        const customer = this.findById(id);
        if (customer) {
            if (data.name !== undefined) customer.name = data.name;
            if (data.phone !== undefined) customer.phone = data.phone;
            if (data.address !== undefined) customer.address = data.address;
        } else {
            console.log("Không tìm thấy khách hàng cần cập nhật!");
        }
    }

    public deleteCustomer(id: string): void {
        this.customers = this.customers.filter(c => c.id !== id);
    }

    public findById(id: string): Customer | undefined {
        return this.customers.find(c => c.id === id);
    }

    public findByPhone(phone: string): Customer | undefined {
        return this.customers.find(c => c.phone === phone);
    }

    public getAllCustomers(): Customer[] {
        return this.customers;
    }

    public printCustomers(): void {
        console.log("--- DANH SÁCH KHÁCH HÀNG ---");
        this.customers.forEach(c => console.log(c.toString()));
    }
}