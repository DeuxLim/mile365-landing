<?php

namespace App\Console\Commands;

use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class BootstrapSuperAdmin extends Command
{
    protected $signature = 'app:bootstrap-super-admin
        {--email= : Super admin email (falls back to SUPER_ADMIN_EMAIL env)}
        {--first-name= : First name (falls back to SUPER_ADMIN_FIRST_NAME env)}
        {--last-name= : Last name (falls back to SUPER_ADMIN_LAST_NAME env)}
        {--password= : Plain-text password (falls back to SUPER_ADMIN_PASSWORD env)}
        {--update-existing : Update the user if it already exists}';

    protected $description = 'Create the initial super admin user (safe for first production deploy)';

    public function handle(): int
    {
        $email = $this->value('email', 'bootstrap.super_admin.email', 'Super admin email');
        if ($email === null) {
            return self::FAILURE;
        }

        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Invalid email address.');
            return self::FAILURE;
        }

        $existing = User::query()->where('email', $email)->first();
        if ($existing !== null && ! $this->option('update-existing')) {
            $this->info("User already exists for {$email}. Skipping (use --update-existing to update).");
            return $this->ensureSuperAdminRole($existing) ? self::SUCCESS : self::FAILURE;
        }

        $firstName = $this->value('first-name', 'bootstrap.super_admin.first_name', 'First name');
        if ($firstName === null) {
            return self::FAILURE;
        }

        $lastName = $this->value('last-name', 'bootstrap.super_admin.last_name', 'Last name');
        if ($lastName === null) {
            return self::FAILURE;
        }

        $password = $this->option('password') ?? config('bootstrap.super_admin.password');
        if ($password === null) {
            if (! $this->input->isInteractive()) {
                $this->error('Missing password. Provide --password or SUPER_ADMIN_PASSWORD in a secret manager.');
                return self::FAILURE;
            }

            $password = $this->secretWithConfirmation('Super admin password');
            if ($password === null) {
                return self::FAILURE;
            }
        }

        if (mb_strlen($password) < 12) {
            $this->error('Password must be at least 12 characters.');
            return self::FAILURE;
        }

        $user = $existing ?? new User();
        $user->fill([
            'email' => $email,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'status' => 'active',
        ]);
        $user->password = Hash::make($password);
        $user->save();

        if (! $this->ensureSuperAdminRole($user)) {
            return self::FAILURE;
        }

        $this->info("Super admin is ready: {$email}");
        return self::SUCCESS;
    }

    private function value(string $option, string $configKey, string $label): ?string
    {
        $value = $this->option($option) ?? config($configKey);
        if (is_string($value) && trim($value) !== '') {
            return trim($value);
        }

        if (! $this->input->isInteractive()) {
            $this->error("Missing {$label}. Provide --{$option} or set the matching env var.");
            return null;
        }

        $asked = $this->ask($label);
        if (! is_string($asked) || trim($asked) === '') {
            $this->error("Missing {$label}.");
            return null;
        }

        return trim($asked);
    }

    private function secretWithConfirmation(string $label): ?string
    {
        $password = $this->secret($label);
        if (! is_string($password) || $password === '') {
            $this->error('Missing password.');
            return null;
        }

        $confirm = $this->secret("Confirm {$label}");
        if (! is_string($confirm) || $confirm === '') {
            $this->error('Missing password confirmation.');
            return null;
        }

        if (! hash_equals($password, $confirm)) {
            $this->error('Passwords do not match.');
            return null;
        }

        return $password;
    }

    private function ensureSuperAdminRole(User $user): bool
    {
        $role = Role::query()->where('name', 'super_admin')->first();
        if ($role === null) {
            $this->error('Role super_admin does not exist. Seed roles first (RolePermissionSeeder).');
            return false;
        }

        $user->roles()->syncWithoutDetaching([$role->id]);
        return true;
    }
}

