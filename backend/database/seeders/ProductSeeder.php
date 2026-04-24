<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Laptop Gaming',
                'description' => 'Laptop performa tinggi untuk gaming dan desain.',
                'price' => 18500000,
                'stock' => 8,
            ],
            [
                'name' => 'Mechanical Keyboard',
                'description' => 'Keyboard mekanik dengan switch tactile.',
                'price' => 950000,
                'stock' => 25,
            ],
            [
                'name' => 'Wireless Mouse',
                'description' => 'Mouse wireless ergonomis untuk produktivitas.',
                'price' => 350000,
                'stock' => 40,
            ],
        ];

        foreach ($products as $product) {
            Product::query()->updateOrCreate(
                ['name' => $product['name']],
                $product
            );
        }
    }
}
