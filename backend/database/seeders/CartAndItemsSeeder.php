<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartAndItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some users and products to associate with carts
        $userIds = DB::table('users')->inRandomOrder()->limit(5)->pluck('id');
        $productIds = DB::table('products')->pluck('id');

        if ($userIds->isEmpty() || $productIds->isEmpty()) {
            return; // prerequisites not met
        }

        foreach ($userIds as $userId) {
            // Create a cart for the user
            $cartId = DB::table('carts')->insertGetId([
                'user_id' => $userId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Add 2-4 random items to the cart
            $numItems = random_int(2, 4);
            $chosenProducts = $productIds->shuffle()->take($numItems);

            $items = [];
            foreach ($chosenProducts as $productId) {
                // Use product's current price if available
                $price = (float) DB::table('products')->where('id', $productId)->value('price');
                $items[] = [
                    'cart_id' => $cartId,
                    'product_id' => $productId,
                    'quantity' => random_int(1, 3),
                    'price' => $price,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            DB::table('cart_items')->insert($items);
        }
    }
}


