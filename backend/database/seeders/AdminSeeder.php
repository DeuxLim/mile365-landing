<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = [
            [
                'first_name' => 'TestAdmin1',
                'last_name' => 'Local',
                'email' => 'limdeux27@gmail.com',
                'password' => 'Test123123!',
                'status' => 'active',
            ],
            [
                'first_name' => 'TestAdmin2',
                'last_name' => 'Local',
                'email' => 'limdeux27@gmail.com',
                'password' => 'Test123123!',
                'status' => 'active',
            ],
            [
                'first_name' => 'TestAdmin3',
                'last_name' => 'Local',
                'email' => 'limdeux27@gmail.com',
                'password' => 'Test123123!',
                'status' => 'active',
            ],
        ];

        $role = Role::where('name', 'club_admin')->first();

        if (!$role) {
            throw new \Exception('Role club_admin does not exist. Seed roles first.');
        }

        foreach ($admins as $admin) {
            $user = User::updateOrCreate(
                ['email' => $admin['email']],
                [
                    'first_name' => $admin['first_name'],
                    'last_name' => $admin['last_name'],
                    'password' => Hash::make($admin['password']),
                    'status' => $admin['status'],
                ]
            );

            $user->roles()->syncWithoutDetaching([$role->id]);
        }
    }
}
