<?php

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use App\Models\User;

// Use the TestCase class which should provide Laravel's testing features
test('can make api requests', function () {
    // Create a user for the test
    $user = User::factory()->create();
    
    // Use Laravel's testing client instead of external HTTP call
    $response = $this->getJson("/api/users/{$user->id}");
    
    // Assert the response
    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                'id', 'name', 'email'
            ]
        ]);
});
