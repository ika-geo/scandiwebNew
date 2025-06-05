<?php

namespace App\Schema\OrderSchema;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeInputType
{
    private static $instance = null;

    public static function getSchema()
    {
        if (self::$instance === null) {
            self::$instance = new InputObjectType([
                'name' => 'AttributeInput',
                'fields' => [
                    'name' => Type::nonNull(Type::string()),
                    'value' => Type::nonNull(Type::string()),
                ]
            ]);
        }
        return self::$instance;
    }
}
