<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = new \App\Models\User();
$user->name = 'Sample User';
$user->email = 'sample' . time() . '@example.com';
$user->password = \Illuminate\Support\Facades\Hash::make('password');
$user->email_verified_at = now();
$user->save();

echo "Created user with ID: " . $user->id . "\n";
echo "Name: " . $user->name . "\n";
echo "Email: " . $user->email . "\n";
