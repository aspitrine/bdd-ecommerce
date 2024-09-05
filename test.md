SELECT
u.id AS user_id,
u.username,
u.email,
COUNT(o.id) AS nombre_commandes
FROM
users u
LEFT JOIN
orders o ON u.id = o.user_id
GROUP BY
u.id, u.username, u.email
ORDER BY
nombre_commandes DESC;

WITH sold_products AS (
SELECT
p.id AS product_id,
p.name AS product_name,
c.id AS category_id,
c.name AS category_name,
SUM(oi.quantity) AS total_sold,
ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY SUM(oi.quantity) DESC) AS rang
FROM
products p
JOIN
categories c ON p.category_id = c.id
JOIN
order_items oi ON p.id = oi.product_id
GROUP BY
p.id, c.id
)
SELECT
category_id,
category_name,
product_id,
product_name,
total_sold,
rang
FROM
sold_products
WHERE
rang <= 3
ORDER BY
category_id, rang, total_sold DESC;
