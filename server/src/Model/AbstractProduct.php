<?php

namespace App\Model;

abstract class AbstractProduct
{
    abstract public static function fetchByCategoryId($pdo, $categoryId);
    abstract public static function fetchById($pdo, $id);
}
