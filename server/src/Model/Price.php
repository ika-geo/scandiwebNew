<?php

namespace App\Model;

class Currency
{
    public function __construct($label, $symbol)
    {
        $this->label = $label;
        $this->symbol = $symbol;
    }
}

class Price
{
    public function __construct($amount, $currency_label, $currency_symbol)
    {
        $this->amount = $amount;
        $this->currency = new Currency($currency_label, $currency_symbol);
    }

    public static function fetchByProductId($pdo, $product_id)
    {
        $stmt = $pdo->prepare('SELECT * FROM prices WHERE product_id = :product_id');
        $stmt->execute(['product_id' => $product_id]);
        $row = $stmt->fetch();
        return new Price($row['amount'], $row['currency_label'], $row['currency_symbol']);
    }
}
