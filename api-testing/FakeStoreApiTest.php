<?php

use PHPUnit\Framework\TestCase;

class FakeStoreApiTest extends TestCase
{
    private $apiUrl = 'https://fakestoreapi.com/products';
    private $products;
    private $defectiveProducts = [];

    protected function setUp(): void
    {
        $response = file_get_contents($this->apiUrl);
        $this->products = json_decode($response, true);
    }

    public function testApiResponseCode()
    {
        $headers = get_headers($this->apiUrl);
        $this->assertEquals(200, substr($headers[0], 9, 3), 'API should return 200 status code');
    }

    public function testProductAttributes()
    {
        foreach ($this->products as $product) {
            $defects = [];

            // Check if title exists and is not empty
            if (!isset($product['title']) || empty($product['title'])) {
                $defects[] = 'Missing or empty title';
            }

            // Check if price exists and is not negative
            if (!isset($product['price']) || $product['price'] < 0) {
                $defects[] = 'Invalid price (missing or negative)';
            }

            // Check if rating.rate exists and is not greater than 5
            if (!isset($product['rating']['rate']) || $product['rating']['rate'] > 5) {
                $defects[] = 'Invalid rating (missing or greater than 5)';
            }

            if (!empty($defects)) {
                $this->defectiveProducts[] = [
                    'id' => $product['id'],
                    'defects' => $defects
                ];
            }
        }

        // Assert that we've checked all products
        $this->assertNotEmpty($this->products, 'API should return at least one product');
        
        // Output defective products if any found
        if (!empty($this->defectiveProducts)) {
            echo "\nDefective Products Found:\n";
            foreach ($this->defectiveProducts as $defective) {
                echo "Product ID: " . $defective['id'] . "\n";
                echo "Defects: " . implode(', ', $defective['defects']) . "\n\n";
            }
        }

        // Print summary message
        $totalProducts = count($this->products);
        $totalDefects = count($this->defectiveProducts);
        
        echo "\n=== Test Summary ===\n";
        echo "Total products processed: " . $totalProducts . "\n";
        echo "Total defects found: " . $totalDefects . "\n";
        
        if ($totalDefects === 0) {
            echo "\n✅ SUCCESS: All " . $totalProducts . " products passed validation!\n";
        } else {
            echo "\n⚠️ WARNING: Found " . $totalDefects . " products with defects out of " . $totalProducts . " total products.\n";
        }
    }
} 