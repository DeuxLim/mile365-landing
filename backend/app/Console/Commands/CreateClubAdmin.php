<?php

namespace App\Console\Commands;

use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CreateClubAdmin extends Command
{
    protected $signature = 'app:create-club-admin
        {--email= : Club admin email}
        {--first-name= : First name}
        {--last-name= : Last name}
        {--password= : Plain-text password (avoid passing via CLI; prefer prompt)}
        {--generate : Generate a random password (non-interactive safe)}
        {--length=16 : Generated password length}
        {--update-existing : Update the user if it already exists}
        {--show-password : Print the password (dangerous in CI/logs)}';

    protected $description = 'Create a club_admin user and assign the club_admin role';

    public function handle(): int
    {
        $email = $this->requiredStringOption('email', 'Email');
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
            return $this->ensureClubAdminRole($existing) ? self::SUCCESS : self::FAILURE;
        }

        $firstName = $this->requiredStringOption('first-name', 'First name');
        if ($firstName === null) {
            return self::FAILURE;
        }

        $lastName = $this->requiredStringOption('last-name', 'Last name');
        if ($lastName === null) {
            return self::FAILURE;
        }

        $password = $this->resolvePassword();
        if ($password === null) {
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

        if (! $this->ensureClubAdminRole($user)) {
            return self::FAILURE;
        }

        $this->info("Club admin is ready: {$email}");

        $shouldShowPassword = (bool) $this->option('show-password');
        $wasGenerated = (bool) $this->option('generate') && $this->option('password') === null;
        if ($wasGenerated || $shouldShowPassword) {
            $this->line("Password: {$password}");
        }

        return self::SUCCESS;
    }

    private function requiredStringOption(string $option, string $label): ?string
    {
        $value = $this->option($option);
        if (is_string($value) && trim($value) !== '') {
            return trim($value);
        }

        if (! $this->input->isInteractive()) {
            $this->error("Missing {$label}. Provide --{$option}.");
            return null;
        }

        $asked = $this->ask($label);
        if (! is_string($asked) || trim($asked) === '') {
            $this->error("Missing {$label}.");
            return null;
        }

        return trim($asked);
    }

    private function resolvePassword(): ?string
    {
        $provided = $this->option('password');
        if (is_string($provided) && $provided !== '') {
            if (mb_strlen($provided) < 12) {
                $this->error('Password must be at least 12 characters.');
                return null;
            }

            return $provided;
        }

        $generate = (bool) $this->option('generate');

        if (! $generate && $this->input->isInteractive()) {
            $generate = (bool) $this->confirm('Generate a random password?', true);
        }

        if ($generate) {
            $length = (int) ($this->option('length') ?? 16);
            $length = max(12, min(64, $length));

            if (method_exists(Str::class, 'password')) {
                return Str::password(length: $length);
            }

            return Str::random($length);
        }

        if (! $this->input->isInteractive()) {
            $this->error('Missing password. Provide --password or use --generate.');
            return null;
        }

        $password = $this->secret('Password');
        if (! is_string($password) || $password === '') {
            $this->error('Missing password.');
            return null;
        }

        $confirm = $this->secret('Confirm password');
        if (! is_string($confirm) || $confirm === '') {
            $this->error('Missing password confirmation.');
            return null;
        }

        if (! hash_equals($password, $confirm)) {
            $this->error('Passwords do not match.');
            return null;
        }

        if (mb_strlen($password) < 12) {
            $this->error('Password must be at least 12 characters.');
            return null;
        }

        return $password;
    }

    private function ensureClubAdminRole(User $user): bool
    {
        $role = Role::query()->where('name', 'club_admin')->first();
        if ($role === null) {
            $this->error('Role club_admin does not exist. Seed roles first (RolePermissionSeeder).');
            return false;
        }

        $user->roles()->syncWithoutDetaching([$role->id]);
        return true;
    }
}

