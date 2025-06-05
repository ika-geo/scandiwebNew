<?php

namespace App\Model;

class Product extends AbstractProduct
{
    public function __construct($id, $name, $inStock, $description, $category, $brand, $attributes = [], $prices, $gallery = [])
    {
        $this->id = $id;
        $this->name = $name;
        $this->inStock = $inStock;
        $this->description = $description;
        $this->category = $category;
        $this->brand = $brand;
        $this->attributes = $attributes;
        $this->prices = $prices;
        $this->gallery = $gallery;
    }

    public static function fetchById($pdo, $id)
    {
        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if (!$row) {
            throw new \Exception('Product not found');
        }
        $attributes = Attribute::fetchByProductId($pdo, $row['id']);
        $prices = Price::fetchByProductId($pdo, $row['id']);
        $gallery = GalleryItem::fetchByProductId($pdo, $row['id']);
        $category = Category::fetchById($pdo, $row['category_id']);
        return new Product($row['id'], $row['name'], $row['inStock'], $row['description'], $category->name, $row['brand'], $attributes, $prices, $gallery);
    }

    public static function fetchByCategoryId($pdo, $category_id)
    {
        $executeParams = null;
        $sqlParams = '';
        if ($category_id!==1){
            $sqlParams = ' WHERE category_id = :category_id';
            $executeParams = ['category_id' => $category_id];
        }
        $stmt = $pdo->prepare('SELECT * FROM products'.$sqlParams);
        $stmt->execute($executeParams);
        $products = [];
        while ($row = $stmt->fetch()) {
            $attributes = Attribute::fetchByProductId($pdo, $row['id']);
            $prices = Price::fetchByProductId($pdo, $row['id']);
            $gallery = GalleryItem::fetchByProductId($pdo, $row['id']);
            $category = Category::fetchById($pdo, $row['category_id']);
            $products[] = new Product($row['id'], $row['name'], $row['inStock'], $row['description'], $category->name, $row['brand'], $attributes, $prices, $gallery);
        }
        return $products;
    }
}
