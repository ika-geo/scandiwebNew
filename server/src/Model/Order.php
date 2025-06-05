<?php
namespace App\Model;

use Exception;
use PDO;

class Order
{
    public static function fetchOrder($pdo, $order_id)
    {
        $stmt = $pdo->prepare('SELECT * FROM orders WHERE id = :id');
        $stmt->execute(['id' => $order_id]);
        $order = $stmt->fetch();

        if ($order) {
            $stmt = $pdo->prepare('SELECT * FROM order_items WHERE order_id = :order_id');
            $stmt->execute(['order_id' => $order_id]);
            $order['items'] = $stmt->fetchAll();

            foreach ($order['items'] as &$item) {
                $stmt = $pdo->prepare('SELECT * FROM order_item_attributes WHERE order_item_id = :order_item_id');
                $stmt->execute(['order_item_id' => $item['id']]);
                $item['attributes'] = $stmt->fetchAll();
            }
        }
        return $order;
    }
    public static function placeOrder($pdo, $args)
    {
        $order = $args['order'];
        $pdo->beginTransaction();

        try {
            $stmt = $pdo->prepare('INSERT INTO orders (created_at) VALUES (NOW())');
            $stmt->execute();
            $orderId = $pdo->lastInsertId();

            foreach ($order as $item) {
                $stmt = $pdo->prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (:order_id, :product_id, :quantity, :price)');
                $stmt->execute([
                    'order_id' => $orderId,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);
                $orderItemId = $pdo->lastInsertId();

                foreach ($item['attributes'] as $attribute) {
                    $stmt = $pdo->prepare('INSERT INTO order_item_attributes (order_item_id, name, value) VALUES (:order_item_id, :name, :value)');
                    $stmt->execute([
                        'order_item_id' => $orderItemId,
                        'name' => $attribute['name'],
                        'value' => $attribute['value']
                    ]);
                }
            }
            $pdo->commit();
            $stmt = $pdo->prepare('SELECT * FROM orders WHERE id = :id');
            $stmt->execute(['id' => $orderId]);
            $createdOrder = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$createdOrder) {
                throw new Exception("Failed to fetch created order");
            }

            return $orderId;
        } catch (Exception $e) {
            $pdo->rollBack();
            throw new Exception("Failed to create order: " . $e->getMessage());
        }
    }
}
