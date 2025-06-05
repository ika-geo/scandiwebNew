<?php


namespace App\Schema\OrderSchema;

use App\Model\Product;
use App\Schema\ProductType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;


class OrderItemType
{
    private static $instance = null;

    public static function getSchema()
    {
        if (self::$instance === null) {
            self::$instance = new ObjectType([
                'name' => 'OrderItem',
                'fields' => [
                    'product_id' => Type::nonNull(Type::string()),
                    'quantity' => Type::nonNull(Type::int()),
                    'price' => Type::nonNull(Type::float()),
                    'attributes' => Type::listOf(OrderAttributeType::getSchema()),
                ]
            ]);
        }
        return self::$instance;
    }
}
