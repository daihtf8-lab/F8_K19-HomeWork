import * as crypto from "crypto";

export interface Customer {
    id: string;
    name: string;
    tax: string;
    address: string;
}

export class Employee {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    receiveNoti(message: string): void {
        console.log(`[${this.id}] - [${this.name}] received notification: ${message}`);
    }
}

export interface Project {
    id: string;
    customerId: string;
    employeeId: string;
}

export class CustomerService {
    private customers: Customer[] = [];

    create(customerData: Omit<Customer, "id">): Customer {
        const newCustomer: Customer = {
            id: crypto.randomUUID(),
            ...customerData
        };
        this.customers.push(newCustomer);
        return newCustomer;
    }

    updateById(id: string, data: Partial<Customer>): Customer | null {
        const index = this.customers.findIndex(c => c.id === id);
        if (index === -1) {
            return null;
        }

        this.customers[index] = { ...this.customers[index], ...data };
        return this.customers[index];
    }
}

export class EmployeeService {
    private employees: Employee[] = [];

    create(employeeData: Omit<Employee, "id" | "receiveNoti">): Employee {
        const id = crypto.randomUUID();
        const newEmployee = new Employee(id, employeeData.name);
        this.employees.push(newEmployee);
        return newEmployee;
    }

    findById(id: string): Employee | null {
        const employee = this.employees.find(e => e.id === id);
        return employee ? employee : null;
    }

    updateById(id: string, data: Partial<Employee>): Employee | null {
        const employee = this.findById(id);
        if (!employee) return null;

        if (data.name !== undefined) {
            employee.name = data.name;
        }
        return employee;
    }
}

export class ProjectService {
    private projects: Project[] = [];

    private employeeService: EmployeeService;

    constructor(employeeService: EmployeeService) {
        this.employeeService = employeeService;
    }

    create(projectData: Omit<Project, "id">): Project {
        const newProject: Project = {
            id: crypto.randomUUID(),
            ...projectData
        };
        this.projects.push(newProject);

        const employee = this.employeeService.findById(newProject.employeeId);
        if (employee) {
            employee.receiveNoti("Bạn vừa được gán vào dự án mới.");
        }

        return newProject;
    }

    updateById(id: string, data: Partial<Project>): Project | null {
        const index = this.projects.findIndex(p => p.id === id);
        if (index === -1) return null;

        const oldProject = this.projects[index];
        const isEmployeeChanged = data.employeeId !== undefined && data.employeeId !== oldProject.employeeId

        this.projects[index] = { ...oldProject, ...data };

        if (isEmployeeChanged && data.employeeId) {
            const newEmployee = this.employeeService.findById(data.employeeId);
            if (newEmployee) {
                newEmployee.receiveNoti("Bạn đã được chuyển giao phụ trách dự án này.");
            }
        }

        return this.projects[index];
    }
}

// Test cases

console.log(" TEST \n");

const customerService = new CustomerService();
const employeeService = new EmployeeService();
const projectService = new ProjectService(employeeService);

// Test Case 1
console.log(" Test Case 1: Tạo Customer ");
const customer1 = customerService.create({ name: "Công ty A", tax: "012345678", address: "Hà Nội" });
console.log("Customer được tạo:", customer1);
console.log("Kiểm tra có ID:", !!customer1.id);
console.log("\n");

// Test Case 2
console.log(" Test Case 2: Cập nhật Customer ");
const updatedCustomer = customerService.updateById(customer1.id, { address: "Hồ Chí Minh" });
console.log("Customer sau khi cập nhật địa chỉ:", updatedCustomer);
console.log("\n");

// Test Case 3
console.log(" Test Case 3: Tạo 2 Employee ");
const emp1 = employeeService.create({ name: "Nguyễn Văn A" });
const emp2 = employeeService.create({ name: "Trần Thị B" });
console.log("Employee 1:", emp1);
console.log("Employee 2:", emp2);
console.log("Kiểm tra ID khác nhau:", emp1.id !== emp2.id);
console.log("\n");

// Test Case 4
console.log(" Test Case 4: Tìm Employee ");
const foundEmp = employeeService.findById(emp1.id);
console.log("Tìm Employee hợp lệ:", foundEmp?.name === "Nguyễn Văn A" ? "Thành công" : "Thất bại");
const notFoundEmp = employeeService.findById("id-khong-ton-tai");
console.log("Tìm Employee không tồn tại (mong đợi null):", notFoundEmp);
console.log("\n");

// Test Case 5
console.log(" Test Case 5: Tạo Project ");
const project1 = projectService.create({
    customerId: customer1.id,
    employeeId: emp1.id
});
console.log("Project được tạo:", project1);
console.log("\n");

// Test Case 6
console.log(" Test Case 6: Đổi nhân viên phụ trách Project ");
const updatedProject = projectService.updateById(project1.id, { employeeId: emp2.id });
console.log("Project sau khi cập nhật nhân viên:", updatedProject);
console.log("\n");

// Test Case 7
console.log(" Test Case 7: Cập nhật Project (chỉ đổi Customer) ");
const projectNotiTest = projectService.updateById(project1.id, { customerId: "customer-id-moi" });
console.log("Project được cập nhật:", projectNotiTest);
console.log("(Nếu không có thông báo nào hiện ra ở trên dòng này là ĐÚNG)");
console.log("\n");

// Test Case 8
console.log(" Test Case 8: Cập nhật ID không tồn tại ");
console.log("Customer update:", customerService.updateById("fake-id", { name: "Fake" }));
console.log("Employee update:", employeeService.updateById("fake-id", { name: "Fake" }));
console.log("Project update:", projectService.updateById("fake-id", { customerId: "Fake" }));
console.log("\n");

// Test Case 9
console.log(" Test Case 9: Tạo Project với Employee rỗng ");
const projectNoEmp = projectService.create({
    customerId: customer1.id,
    employeeId: "emp-khong-ton-tai"
});
console.log("Project vẫn tạo thành công nhưng không có ai nhận thông báo:", projectNoEmp);