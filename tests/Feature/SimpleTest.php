<?php

use Tests\TestCase;
use App\Models\User;

uses(TestCase::class);

test('basic test', function () {
    // Create a user and act as that user
    $user = User::factory()->create();
    
    // This is Laravel's way of authenticating a user for tests
    $this->actingAs($user);
    
    // Make a request to a route
    $response = $this->get('/');
    
    // Assert the response status
    $response->assertStatus(200);
});
