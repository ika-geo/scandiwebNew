<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType extends AbstractSchema{
    private static $instance = null;
    public static function getSchema() {
        if (self::$instance === null) {
            self::$instance = new ObjectType([
                'name' => 'Price',
                'fields' => [
                    'amount' => Type::nonNull(Type::float()),
                    'currency'=>CurrencyType::getSchema()
                ]
            ]);
        }
        return self::$instance;
    }
}