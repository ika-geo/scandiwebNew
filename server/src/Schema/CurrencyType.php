<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CurrencyType extends AbstractSchema{
    private static $instance = null;
    public static function getSchema() {
        if (self::$instance === null) {
            self::$instance = new ObjectType([
                'name' => 'Currency',
                'fields' => [
                    'label' => Type::nonNull(Type::string()),
                    'symbol' => Type::nonNull(Type::string())
                ]
            ]);
        }
        return self::$instance;
    }
}