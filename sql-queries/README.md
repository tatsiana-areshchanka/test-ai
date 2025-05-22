# Orders Analysis SQL Queries

This directory contains SQL queries for analyzing order data. The main file `orders_analysis.sql` includes table creation, sample data insertion, and various analysis queries.

## Database Structure

The `orders` table has the following structure:
```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);
```

## Sample Data

The file includes sample data for three customers (Alice, Bob, and Charlie) with various order amounts and dates spanning February and March 2024.

## Analysis Queries

The file contains four main analysis queries:

1. **Total Sales Volume for March 2024**
   - Calculates the sum of all order amounts for March 2024
   - Uses fixed date range: '2024-03-01' to '2024-03-31'

2. **Top Spending Customer**
   - Identifies the customer with the highest total spending
   - Groups orders by customer and sums their amounts
   - Returns the customer with the highest total

3. **Average Order Value (Fixed Date Range)**
   - Calculates the average order value for the three months leading up to March 30, 2024
   - Uses a fixed end date of '2024-03-30'

4. **Average Order Value (Dynamic Date Range)**
   - Calculates the average order value for the last three months from the current date
   - Uses dynamic date functions: `date('now')` and `date('now', '-3 months')`
   - Automatically adjusts as time passes

## How to Use

1. Create the database and table using the provided CREATE TABLE statement
2. Insert the sample data using the provided INSERT statements
3. Run any of the analysis queries to get the desired insights

## Expected Results

Based on the sample data:
- March 2024 total sales: 28,000
- Top spending customer: Alice (total: 20,000)
- Average order value (fixed date range): 6,000
- Average order value (dynamic) will vary based on current date 