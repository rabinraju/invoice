CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL,
    invoice_date DATE NOT NULL,
    customer_name VARCHAR(100),
    subtotal DECIMAL(10,2),
    tax DECIMAL(10,2),
    tax_amount DECIMAL(10,2),
    discount DECIMAL(10,2),
    net_total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
