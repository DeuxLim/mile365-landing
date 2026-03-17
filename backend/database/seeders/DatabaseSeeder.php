<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Safe to run in all environments (no credentials / fake data).
        $this->call([
            RolePermissionSeeder::class,
        ]);

        // Sample users and factory data should never be seeded in production by default.
        if (! app()->environment('production')) {
            $this->call([
                SuperAdminSeeder::class,
                AdminSeeder::class,
                MembershipRequestSeeder::class,
            ]);
        }
    }
}
