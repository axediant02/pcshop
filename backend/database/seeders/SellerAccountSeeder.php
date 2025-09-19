<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SellerAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'), // default password
            'role' => 'customer', // default role
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ];
    }

    // custom state for seller
    public function seller()
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'seller',
        ]);
    }
}
