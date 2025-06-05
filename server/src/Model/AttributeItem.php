<?php

namespace App\Model;

class AttributeItem
{
    public $id;
    public $displayValue;
    public $value;

    public function __construct($id, $displayValue, $value)
    {
        $this->id = $id;
        $this->displayValue = $displayValue;
        $this->value = $value;
    }

    public static function fetchByAttributeId($pdo, $attribute_id)
    {
        $stmt = $pdo->prepare('SELECT * FROM attribute_items WHERE attribute_id = :attribute_id');
        $stmt->execute(['attribute_id' => $attribute_id]);
        $items = [];
        while ($row = $stmt->fetch()) {
            $items[]=new AttributeItem($row['displayValue'], $row['displayValue'], $row['value']);
        }
        return $items;
    }
}
