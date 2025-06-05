<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Model\Price;

class ProductType extends AbstractSchema {

    private static $instance = null;
    public static function getSchema() {
        if (self::$instance === null) {
            self::$instance = new ObjectType([
                'name' => 'Product',
                'fields' => [
                    'id' => Type::nonNull(Type::string()),
                    'name' => Type::nonNull(Type::string()),
                    'inStock' => Type::nonNull(Type::boolean()),
                    'description' => Type::string(),
                    'category_id' => Type::int(),
                    'brand' => Type::string(),
                    'category'=>Type::nonNull(Type::string()),
                    'gallery' => Type::listOf(Type::string()),
                    'attributes' => Type::listOf(AttributeType::getSchema()),
                    'prices' => PriceType::getSchema()
                ]
            ]);
        }
        return self::$instance;
    }
}