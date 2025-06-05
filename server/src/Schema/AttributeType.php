<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends AbstractSchema
{
    private static $instance = null;
    public static function getSchema() {
        if (self::$instance === null) {
            self::$instance = new ObjectType([
                'name' => 'AttributeSet',
                'fields' => [
                    'id' => Type::nonNull(Type::string()),
                    'type' => Type::nonNull(Type::string()),
                    'name' => Type::nonNull(Type::string()),
                    'items' => [
                        'type' => Type::listOf(AttributeItemType::getSchema()),
                    ]
                ]
            ]);
        }
        return self::$instance;
    }

}
