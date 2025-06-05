<?php

namespace App\Schema\OrderSchema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderAttributeType
{
    private static $instance = null;

    public static function getSchema()
    {
        if (self::$instance === null) {
            self::$instance = new ObjectType([
                'name' => 'OrderAttribute',
                'fields' => [
                    'name' => Type::nonNull(Type::string()),
                    'value' => Type::nonNull(Type::string()),
                ]
            ]);
        }
        return self::$instance;
    }
}
