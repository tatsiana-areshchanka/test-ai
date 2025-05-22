# Fake Store API Testing Suite

This project contains automated tests for validating the Fake Store API (https://fakestoreapi.com/products) using PHPUnit.

## Test Objectives

The test suite validates the following aspects of the API response:

1. Server Response
   - Verifies HTTP status code (200)

2. Product Data Validation
   - Title: Must not be empty
   - Price: Must not be negative
   - Rating: Must not exceed 5.0

3. Defect Reporting
   - Generates a detailed list of products containing defects
   - Reports specific issues for each defective product

## Prerequisites

- PHP 7.4 or higher
- Composer (PHP package manager)
- PHPUnit 9.x or higher

## Installation

1. Clone the repository or copy the test files to your project directory

2. Install dependencies using Composer:
```bash
composer require --dev phpunit/phpunit
```

## Running the Tests

Execute the test suite using PHPUnit:

```bash
./vendor/bin/phpunit FakeStoreApiTest.php
```

## Test Structure

The test suite consists of two main test methods:

1. `testApiResponseCode()`
   - Validates the API endpoint is accessible
   - Checks for HTTP 200 response

2. `testProductAttributes()`
   - Validates each product's required attributes
   - Checks for data integrity
   - Generates a report of defective products

## Output

The test suite will output:
- Test execution results
- List of any defective products found, including:
  - Product ID
  - Specific defects identified

## Example Output

```
Defective Products Found:
Product ID: 1
Defects: Invalid rating (greater than 5)

Product ID: 3
Defects: Missing or empty title, Invalid price (negative)
```

## Adding New Tests

To add new test cases:

1. Open `FakeStoreApiTest.php`
2. Add new test methods following the existing pattern
3. Use PHPUnit assertions to validate your conditions

## Troubleshooting

If you encounter issues:

1. Verify PHP and PHPUnit are properly installed:
```bash
php -v
./vendor/bin/phpunit --version
```

2. Check your internet connection (API endpoint must be accessible)

3. Ensure you have proper permissions to execute the test files

## Contributing

Feel free to:
- Add new test cases
- Improve existing validations
- Report issues
- Suggest enhancements 