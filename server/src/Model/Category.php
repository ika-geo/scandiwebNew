<?php

namespace App\Model;

class Category
{
    public function __construct($id, $name)
    {
        $this->id = $id;
        $this->name = $name;
    }

    public static function fetchAll($pdo)
    {
        $stmt = $pdo->prepare('SELECT * FROM categories');
        $stmt->execute();
        $categories = [];
        while ($row = $stmt->fetch()) {
            $categories[] = new Category($row['id'], $row['name']);
        }
        return $categories;
    }

    public static function fetchById($pdo, $id)
    {
        $stmt = $pdo->prepare('SELECT * FROM categories WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if (!$row) {
            throw new \Exception('Category not found');
        }
        return new Category($row['id'], $row['name']);
    }
}
