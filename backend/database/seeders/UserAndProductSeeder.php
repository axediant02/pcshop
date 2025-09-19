<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserAndProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create users: 5 admins, 5 sellers, 5 customers
        $admins = User::factory(5)->create(['role' => 'admin']);
        $sellers = User::factory(5)->create(['role' => 'seller']);
        $customers = User::factory(5)->create(['role' => 'customer']);

        // Ensure at least one known seller exists
        $knownSeller = User::firstOrCreate(
            ['email' => 'seller@example.com'],
            [
                'name' => 'Demo Seller',
                'role' => 'seller',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Build list of seller IDs
        $sellerIds = $sellers->pluck('id')->push($knownSeller->id)->all();

        // Seed 20 products distributed among sellers
        $products = [];
        for ($i = 1; $i <= 20; $i++) {
            $products[] = [
                'name' => "Product $i",
                'category' => fake()->randomElement(['Electronics', 'Home & Kitchen', 'Sports', 'Books', 'Toys']),
                'description' => fake()->sentence(12),
                'price' => fake()->randomFloat(2, 5, 500),
                'stock' => fake()->numberBetween(0, 200),
                'seller_id' => fake()->randomElement($sellerIds),
                'image_url' => 'https://via.placeholder.com/600x400?text=Product+' . $i,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert or update by (name, seller_id)
        foreach ($products as $data) {
            Product::updateOrCreate(
                [
                    'name' => $data['name'],
                    'seller_id' => $data['seller_id'],
                ],
                $data
            );
        }
    }
}


