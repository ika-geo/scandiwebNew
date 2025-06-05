<?php

namespace App\Controller;


use GraphQL\Error\DebugFlag;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;

use App\Database;
use App\Model\Product;
use App\Model\Category;
use App\Model\Order;

use App\Schema\ProductType;
use App\Schema\OrderSchema\FetchOrderType;
use App\Schema\CategoryType;
use App\Schema\OrderSchema\OrderItemInputType;



class GraphQL
{
    static public function handle()
    {
        $db = new Database();
        $pdo = $db->getConnection();
        try {
            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'echo' => [
                        'type' => Type::string(),
                        'args' => [
                            'message' => ['type' => Type::string()],
                        ],
                        'resolve' => static fn($rootValue, array $args): string => $rootValue['prefix'] . $args['message'],
                    ],
                    'product' => [
                        'type' => ProductType::getSchema(),
                        'args' => [
                            'product_id' => Type::nonNull(Type::string()),
                        ],
                        'resolve' => function ($root, $args) use ($pdo) {
                            return Product::fetchById($pdo, $args['product_id']);
                        }
                    ],
                    'productsByCategory' => [
                        'type' => fn() => Type::listOf(ProductType::getSchema()),
                        'args' => [
                            'category_id' => Type::nonNull(Type::int())
                        ],
                        'resolve' => function ($root, $args) use ($pdo) {
                            return Product::fetchByCategoryId($pdo, $args['category_id']);
                        }
                    ],
                    'categories' => [
                        'type' => Type::listOf(CategoryType::getSchema()),
                        'resolve' => function () use ($pdo) {
                            return Category::fetchAll($pdo);
                        }
                    ],
                    'getOrder' => [
                        'type' => FetchOrderType::getSchema(),
                        'args' => [
                            'order_id' => Type::nonNull(Type::int()),
                        ],
                        'resolve' => function ($root, $args) use ($pdo) {
                            return Order::fetchOrder($pdo, $args['order_id']);
                        }
                    ],
                ],
            ]);

            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'sum' => [
                        'type' => Type::int(),
                        'args' => [
                            'x' => ['type' => Type::int()],
                            'y' => ['type' => Type::int()],
                        ],
                        'resolve' => static fn($calc, array $args): int => $args['x'] + $args['y'],
                    ],
                    'createOrder' => [
                        'type' => Type::int(),
                        'args' => [
                            'order' => Type::listOf(OrderItemInputType::getSchema()),
                        ],
                        'resolve' => function ($root, $args) use ($pdo) {
                            return Order::placeOrder($pdo, $args);
                        }
                    ]
                ]
            ]);
            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $rootValue = ['prefix' => 'You said: '];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray(DebugFlag::INCLUDE_TRACE | DebugFlag::INCLUDE_DEBUG_MESSAGE);
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }
        header('Content-Type: application/json; charset=UTF-8');
        return $output;
    }
}
