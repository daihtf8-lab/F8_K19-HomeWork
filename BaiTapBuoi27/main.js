import { renderTable } from './utils/index.js';
import { headers } from './utils/const/customer.js';

const API_URL = 'http://localhost:3000/customers';
let currentCustomers = [];

const getCustomers = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch {
        alert('Fetch data failed!');
    }
}

const deleteCustomer = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        await refreshTable();
    } catch (error) {
        alert('Xóa thất bại!');
    }
}

const saveCustomer = async (data, id) => {
    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        document.getElementById('popup-toggle').checked = false;
        await refreshTable();
    } catch (error) {
        alert('Lưu dữ liệu thất bại!');
    }
}

const refreshTable = async () => {
    currentCustomers = await getCustomers();
    const panel = document.querySelector('.panel');

    const oldTable = panel.querySelector('.table-container');
    if (oldTable) oldTable.remove();

    panel.append(renderTable(headers, currentCustomers, 'table-container'));
}

const initEvents = () => {
    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.trim().toLowerCase();

        const filteredCustomers = currentCustomers.filter(customer => {
            return (
                (customer.companyName && customer.companyName.toLowerCase().includes(keyword)) ||
                (customer.email && customer.email.toLowerCase().includes(keyword)) ||
                (customer.phone && customer.phone.toLowerCase().includes(keyword)) ||
                (customer.taxId && customer.taxId.toLowerCase().includes(keyword))
            );
        });

        const panel = document.querySelector('.panel');
        const oldTable = panel.querySelector('.table-container');
        if (oldTable) oldTable.remove(); // Xóa bảng cũ

        panel.append(renderTable(headers, filteredCustomers, 'table-container'));
    });

    document.querySelector('.panel').addEventListener('click', (e) => {
        const btnDelete = e.target.closest('.delete-btn');
        if (btnDelete) {
            deleteCustomer(btnDelete.dataset.id);
        }

        const btnEdit = e.target.closest('.edit-btn');
        if (btnEdit) {
            const id = btnEdit.dataset.id;
            const customer = currentCustomers.find(c => c.id == id);

            if (customer) {
                document.getElementById('inp-id').value = customer.id;
                document.getElementById('inp-name').value = customer.companyName || '';
                document.getElementById('inp-email').value = customer.email || '';
                document.getElementById('inp-phone').value = customer.phone || '';
                document.getElementById('inp-tax').value = customer.taxId || '';
                document.getElementById('inp-address').value = customer.address || '';
            }
        }
    });

    document.querySelector('.btn-add').addEventListener('click', () => {
        document.getElementById('inp-id').value = '';
        document.getElementById('inp-name').value = '';
        document.getElementById('inp-email').value = '';
        document.getElementById('inp-phone').value = '';
        document.getElementById('inp-tax').value = '';
        document.getElementById('inp-address').value = '';
    });

    document.querySelector('.btn-save').addEventListener('click', () => {
        const id = document.getElementById('inp-id').value;

        const customerData = {
            companyName: document.getElementById('inp-name').value.trim(),
            email: document.getElementById('inp-email').value.trim(),
            phone: document.getElementById('inp-phone').value.trim(),
            taxId: document.getElementById('inp-tax').value.trim(),
            address: document.getElementById('inp-address').value.trim(),
            status: "Active"
        };

        if (!customerData.companyName) {
            alert('Vui lòng nhập Company Name!');
            return;
        }

        if (!id) {
            customerData.id = `CUST-${Math.floor(Math.random() * 10000)}`;
        }

        saveCustomer(customerData, id);
    });
}

const init = async () => {
    await refreshTable();
    initEvents();
}

init();