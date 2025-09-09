<?php

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use App\Models\User;

// Use the TestCase class which should provide Laravel's testing features
test('can make api requests', function () {
    // Make a request to an API endpoint
    $response = Http::get('http://localhost:8000/api/users/1');
    
    // Assert the response
    expect($response->status())->toBe(200);
});
