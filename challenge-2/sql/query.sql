-- Fetch products between $50-$200
SELECT *
FROM products
WHERE price BETWEEN 50 AND 200
ORDER BY price ASC
LIMIT 10 OFFSET 0;

-- Index optimization
CREATE INDEX idx_products_price
ON products(price);