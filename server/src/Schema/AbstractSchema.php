<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;


abstract class AbstractSchema
{
    abstract public static function getSchema();
}
