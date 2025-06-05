<?php


namespace App\Schema\OrderSchema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Schema\OrderSchema\OrderItemInputType;

class FetchOrderType
{
    private static $instance = null;

    public static function getSchema()
    {
        if (self::$instance === null) {
            self::$instance = new ObjectType([
                'name' => 'Order',
                'fields' => [
                    'id' => Type::nonNull(Type::int()),
                    'created_at' => Type::nonNull(Type::string()),
                    'items' => Type::listOf(OrderItemType::getSchema()),
                ]
            ]);
        }
        return self::$instance;
    }
}
