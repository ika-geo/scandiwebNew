<?php

namespace App\Schema\OrderSchema;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemInputType
{
    private static $instance = null;

    public static function getSchema()
    {
        if (self::$instance === null) {
            self::$instance = new InputObjectType([
                'name' => 'OrderItemInput',
                'fields' => [
                    'product_id' => Type::nonNull(Type::string()),
                    'quantity' => Type::nonNull(Type::int()),
                    'price' => Type::nonNull(Type::float()),
                    'attributes' => Type::listOf(AttributeInputType::getSchema()),
                ]
            ]);
        }
        return self::$instance;
    }
}
