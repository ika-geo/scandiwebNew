<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeItemType extends AbstractSchema
{
    private static $instance = null;
    public static function getSchema() {
        if (self::$instance === null) {
            self::$instance = new ObjectType([
                'name' => 'Attribute',
                'fields' => [
                    'displayValue' => Type::nonNull(Type::string()),
                    'value' => Type::nonNull(Type::string()),
                    'id' => Type::nonNull(Type::string()),
                ]
            ]);
        }
        return self::$instance;
    }
}
