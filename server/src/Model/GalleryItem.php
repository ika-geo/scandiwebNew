<?php

namespace App\Model;

class GalleryItem
{
    public function __construct($id, $image_url)
    {
        $this->id = $id;
        $this->image_url = $image_url;
    }
    public static function fetchByProductId($pdo, $product_id)
    {
        $stmt = $pdo->prepare('SELECT image_url FROM gallery WHERE product_id = :product_id');
        $stmt->execute(['product_id' => $product_id]);
        $gallery = [];
        while ($row = $stmt->fetch()) {
            $gallery[]=$row['image_url'];
        }
        return $gallery;
    }
}
