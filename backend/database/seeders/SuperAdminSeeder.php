<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Local/dev-only default. Do not use this seeder for production bootstrap.
        $user = User::updateOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'password' => Hash::make('passwordpassword'),
                'status' => 'active',
            ]
        );

        // Assign Role to the created user
        $role = Role::where('name', 'super_admin')->first();
        if (!$role) {
            throw new \Exception('Role super_admin does not exist. Seed roles first.');
        }
        $user->roles()->syncWithoutDetaching([$role->id]);
    }
}
