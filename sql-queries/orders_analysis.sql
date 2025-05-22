-- Create orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

-- Insert sample data
INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');

-- Task 1: Calculate total sales volume for March 2024
SELECT SUM(amount) as total_sales
FROM orders
WHERE order_date >= '2024-03-01' AND order_date <= '2024-03-31';

-- Task 2: Find the customer who spent the most overall
SELECT customer, SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- Task 3: Calculate average order value for the last three months (uses a fixed end date ('2024-03-30'))
SELECT AVG(amount) as average_order_value
FROM orders
WHERE order_date >= date('2024-03-30', '-3 months')
AND order_date <= '2024-03-30';

-- Task 4: Calculate average order value for the last three months from current date
SELECT AVG(amount) as average_order_value_current
FROM orders
WHERE order_date >= date('now', '-3 months')
AND order_date <= date('now'); 