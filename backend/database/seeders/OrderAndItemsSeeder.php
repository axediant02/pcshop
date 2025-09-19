<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderAndItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = User::where('role', 'customer')->get();
        $products = Product::all();

        if ($customers->isEmpty() || $products->isEmpty()) {
            return;
        }

        // Create 15 orders for random customers
        for ($i = 0; $i < 15; $i++) {
            DB::transaction(function () use ($customers, $products) {
                $customer = $customers->random();
                $order = Order::create([
                    'user_id' => $customer->id,
                    'status' => fake()->randomElement(['pending', 'paid', 'shipped', 'completed']),
                    'total' => 0,
                ]);

                $numItems = fake()->numberBetween(1, 5);
                $picked = $products->random(min($numItems, $products->count()))->values();
                $total = 0;

                foreach ($picked as $product) {
                    $quantity = fake()->numberBetween(1, 3);
                    $lineTotal = $quantity * $product->price;

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'price' => $product->price,
                    ]);

                    $total += $lineTotal;
                }

                $order->update(['total' => $total]);
            });
        }
    }
}


