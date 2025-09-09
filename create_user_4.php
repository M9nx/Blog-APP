<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "Creating a new user specifically with ID 4...\n";

// Delete any existing user first to make sure ID 4 is available
try {
    $existingUser = \App\Models\User::find(4);
    if ($existingUser) {
        $existingUser->delete();
        echo "Deleted existing user with ID 4\n";
    }
} catch (Exception $e) {
    // Ignore if user doesn't exist
}

// Create user with a specific ID by inserting directly
\Illuminate\Support\Facades\DB::table('users')->insert([
    'id' => 4,
    'name' => 'Profile Test User',
    'email' => 'profile.test@example.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password'),
    'email_verified_at' => now(),
    'created_at' => now(),
    'updated_at' => now()
]);

echo "Created user with ID 4\n";
echo "Name: Profile Test User\n";
echo "Email: profile.test@example.com\n";
