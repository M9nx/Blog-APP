<?php

use App\Models\User;
use App\Models\Post;

test('can view user profile api', function () {
    // Create a test user
    $user = User::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'bio' => 'A test bio',
        'avatar' => 'test-avatar.jpg'
    ]);
    
    // Create a test post
    $post = Post::factory()->create([
        'user_id' => $user->id,
        'title' => 'Test Post',
        'content' => 'Test content',
        'status' => 'published',
        'published_at' => now()
    ]);
    
    // Make a request to the API endpoint
    $response = $this->get("/api/users/{$user->id}");
    
    // Assert response is successful
    $response->assertStatus(200);
    
    // Assert JSON structure
    $response->assertJsonStructure([
        'success',
        'data' => [
            'id', 
            'name', 
            'bio', 
            'avatar'
        ]
    ]);
    
    // Assert specific data values
    $response->assertJson([
        'success' => true,
        'data' => [
            'name' => 'Test User',
            'bio' => 'A test bio',
            'avatar' => 'test-avatar.jpg'
        ]
    ]);
});
