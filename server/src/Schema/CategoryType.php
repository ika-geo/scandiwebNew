<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategoryType extends AbstractSchema{
    private static $instance = null;
    public static function getSchema() {
        if (self::$instance === null) {
            self::$instance = new ObjectType([
                'name' => 'Category',
                'fields' => [
                    'id' => Type::nonNull(Type::int()),
                    'name' => Type::nonNull(Type::string()),
                ]
            ]);
        }
        return self::$instance;
    }
}



