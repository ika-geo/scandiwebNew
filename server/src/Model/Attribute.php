<?php

namespace App\Model;

class Attribute
{
    public $id;
    public $type;
    public $name;
    public $items;

    public function __construct($id, $type, $name, $items=[])
    {
        $this->id = $id;
        $this->type = $type;
        $this->name = $name;
        $this->items = $items;
    }

    public static function fetchByProductId($pdo, $product_id)
    {
        $stmt = $pdo->prepare('SELECT * FROM attributes WHERE product_id = :product_id');
        $stmt->execute(['product_id' => $product_id]);
        $attributes = [];
        while ($row = $stmt->fetch()) {
            $attributItems = AttributeItem::fetchByAttributeId($pdo, $row['id']);
            $attributes[] = new Attribute($row['name'], $row['type'], $row['name'], $attributItems);
        }
        return $attributes;
    }
}
